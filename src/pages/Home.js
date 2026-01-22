import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import song1 from "../assets/musics/After-the-Rain-Inspiring-Atmospheric-Music.mp3";
import song2 from "../assets/musics/Moon-Waltz.mp3";
import song3 from "../assets/musics/sb_adriftamonginfinitestars.mp3";
import song4 from "../assets/musics/scott-buckley-moonlight.mp3";
import { storeSelectedMusic } from "../redux/slices/fetchSelectedMusic/fetchSelectedMusic";
import { StaticRouterLinks } from "../utils/StaticRouterLinks";

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const music = useSelector((state) => state.fetchSelectedMusic)?.music;
  const [isButtonDisable, setIsButtonDisable] = useState(false);

  const arr = [1, 2, 3, 4];

  let musicObj={
    0:song1,
    1:song2,
    2:song3,
    3:song4,
  }

  const handleMusic = (ind) => {
    
    dispatch(
      storeSelectedMusic({
        music: musicObj[ind],
      }),
    );
    setIsButtonDisable(false);
  };

  const playMusic = () => {
    navigate(StaticRouterLinks?.music);
  };

  function getKeyByValue(obj, value) {
    return Object.keys(obj).find(key => obj[key] === value);
  }
  
  return (
    <div className="h-full w-full flex flex-col gap-[80px] justify-center items-center">
      <div className="w-full flex justify-around">
        {arr.map((val, ind) => (
          <div
            key={ind}
            className={`${getKeyByValue(musicObj,music) == ind && "!opacity-25"} flex justify-center items-center h-[200px] w-[200px] bg-black text-white text-lg font-semibold border cursor-pointer`}
            onClick={() => handleMusic(ind)}
          >
         
          {getKeyByValue(musicObj,music) == ind?"Selected" :` Song ${val}`}
          </div>
        ))}
      </div>
      <div>
        <button
          className={`w-[160px] h-[72px] bg-black text-white text-lg font-semibold border border-black rounded-[16px] transition-all duration-200 hover:bg-white hover:text-black cursor-pointer`}
          disabled={isButtonDisable}
          onClick={() => playMusic()}
        >
          Play
        </button>
      </div>
    </div>
  );
}

export default Home;
