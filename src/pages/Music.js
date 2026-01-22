import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

function Music() {
  const music = useSelector(
    (state) => state.fetchSelectedMusic?.music
  );

  const audioRef = useRef(null);
  const intervalRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [startTime, setStartTime] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const [milkQuantity, setMilkQuantity] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const API_URL = "https://backend-fv9m.onrender.com/api";

  const playMusic = () => {
    audioRef.current.play();
    setIsPlaying(true);

    if (!startTime) {
      setStartTime(new Date());
    }
  }; 

  const pauseMusic = () => {
    audioRef.current.pause();
    setIsPlaying(false);
  };

  const onStopClick = () => {
    if (!startTime) return;
    pauseMusic()
    setShowModal(true);
  };



  const handleProceed = async () => {
    if (!milkQuantity) return alert("Please enter milk quantity");

    const endTime = new Date();
    const durationInSeconds = Math.floor(currentTime);

    const requestPacket = {
      start_time: startTime,
      end_time: endTime,
      duration: durationInSeconds,
      milk_quantity: Number(milkQuantity),
    };

    try {
      setIsSaving(true);
      await axios.post(`${API_URL}/sessions`, requestPacket);
    } catch (error) {
      console.error(
        "Failed to save session:",
        error.response?.data || error.message
      );
    } finally {
      resetAll();
    }
  };

  const resetAll = () => {
    audioRef.current.pause();
    audioRef.current.currentTime = 0;

    setIsPlaying(false);
    setCurrentTime(0);
    setStartTime(null);
    setMilkQuantity("");
    setShowModal(false);
    setIsSaving(false);
  };

 

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentTime(audioRef.current.currentTime);
      }, 500);
    }
    return () => clearInterval(intervalRef.current);
  }, [isPlaying]);

  const progress = duration ? (currentTime / duration) * 100 : 0;

 

  return (
    <>
      <div className="h-full w-full flex flex-col gap-[80px] justify-center items-center">
        <div className="w-[880px] bg-black rounded-[16px] p-6">
          <div className="h-[420px] flex justify-center items-center">
            {!isPlaying ? (
              <button
                onClick={playMusic}
                className="w-[160px] h-[72px] bg-white text-black text-lg font-semibold rounded-[16px]"
              >
                Play
              </button>
            ) : (
              <button
                onClick={pauseMusic}
                className="w-[160px] h-[72px] bg-white text-black text-lg font-semibold rounded-[16px]"
              >
                Pause
              </button>
            )}
          </div>

          <div className="mt-6">
            <div className="h-[6px] w-full bg-gray-600 rounded-full overflow-hidden">
              <div
                className="h-full bg-green-500 transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="flex justify-between text-sm mt-2 text-gray-300">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>
        </div>

        <div className="flex gap-[40px]">
          <button
            onClick={pauseMusic}
            disabled={!isPlaying}
            className="w-[160px] h-[72px] bg-black text-white text-lg font-semibold border border-black rounded-[16px]
                       transition-all duration-200 hover:bg-white hover:text-black disabled:opacity-40"
          >
            Pause
          </button>

          <button
            onClick={onStopClick}
            className="w-[160px] h-[72px] bg-black text-white text-lg font-semibold border border-black rounded-[16px]
                       transition-all duration-200 hover:bg-white hover:text-black"
          >
            Stop
          </button>
        </div>

        <audio
          ref={audioRef}
          src={music}
          onLoadedMetadata={(e) => setDuration(e.target.duration)}
        />
      </div>

     

      {showModal && (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
          <div className="bg-white rounded-[16px] p-6 w-[320px]">
            <h2 className="text-lg font-bold mb-4">
              Milk Collected (Liters)
            </h2>

            <input
              type="number"
              placeholder="e.g. 6.5"
              value={milkQuantity}
              onChange={(e) => setMilkQuantity(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 mb-4"
            />

            <div className="flex justify-end gap-4">
              <button
                onClick={() => {setShowModal(false);playMusic()}}
                className="px-4 py-2 border rounded-lg"
              >
                Cancel
              </button>

              <button
                onClick={handleProceed}
                disabled={isSaving}
                className="px-4 py-2 bg-black text-white rounded-lg disabled:opacity-40"
              >
                {isSaving ? "Saving..." : "Proceed"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Music;



function formatTime(time) {
  const m = Math.floor(time / 60);
  const s = Math.floor(time % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}
