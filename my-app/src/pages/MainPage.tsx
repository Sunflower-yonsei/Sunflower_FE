import React from "react";
import { useMediaQuery } from "react-responsive";
import NavBar from "../components/NavBar";
import BrailleDeco from "../components/BrailleDeco";
import "../tailwind.css";
import ConvertPageRoutingButton from "../components/ConvertPageRoutingButton";
import { useLanguage } from "../LanguageContext";
import { useHighContrast } from "../components/HighContrastMode";

const MainPage = () => {
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const { language } = useLanguage();
  const textClassName = language === "ko" ? "font-kor" : "font-eng";
  const { isHighContrast } = useHighContrast();

  return (
    <div>
      <div
        className={`w-full h-screen ${
          isHighContrast ? "bg-black" : "bg-stone-200"
        } bottom-0 relative`}
      >
        <NavBar />
        <div
          className={`w-full ${
            isMobile ? "h-[300px]" : "h-[450px]"
          } overflow-hidden ${
            isHighContrast ? "bg-[#2B2B2B]" : "bg-[#FF6A3F]"
          } flex items-center justify-center`}
        >
          {isMobile && (
            <div className="relative text-center flex justify-center items-center h-[300px] bg-[#FF6A3F]">
              <div className="z-10 text-neutral-800">
                <div
                  className={`${textClassName} ${
                    isHighContrast ? "text-yellow-300" : "text-neutral-800"
                  } text-6xl font-bold leading-[72px]`}
                >
                  SUNNY BRAILLE
                </div>
                <div
                  className={`${textClassName} ${
                    isHighContrast ? "text-yellow-300" : "text-neutral-800"
                  } text-base mt-4`}
                >
                  {language === "ko"
                    ? "모바일에서도 최적의 경험을 제공합니다."
                    : "Provides the best experience on mobile as well."}
                </div>
              </div>
              <img
                src="img/bannerlogo.png"
                alt="Banner Logo"
                className="absolute right-[-180px] bottom-[-100px] w-auto h-auto max-h-[300px] max-w-[300px] z-0"
              />
            </div>
          )}

          {/* Computer Page */}
          {!isMobile && (
            <div>
              <div className="w-auto h-[72px] top-[200px] left-[150px] absolute">
                <div
                  className={`SunnyBraille ${isHighContrast ? 'text-yellow-300': 'text-neutral-800'} font-eng text-6xl font-bold leading-[72px] tracking-wide`}
                >
                  SUNNY BRAILLE
                </div>
              </div>
              <div className="w-auto h-[72px] top-[290px] left-[150px] absolute">
                <div
                  className={`${textClassName} ${isHighContrast ? 'text-yellow-300': 'text-neutral-800'} w-[926px] text-2xl font-semibold leading-[18.90px]`}
                >
                  {language === "ko"
                    ? "Sunny Braille은 해바라기팀이 개발한 교육용 웹 점역 소프트웨어 입니다."
                    : "Sunny Braille is an educational web braille software developed by Haebaragi team."}
                </div>
              </div>
              <div className="w-auto h-auto top-[350px] left-[150px] absolute">
                <div
                  className={`${textClassName} ${isHighContrast ? 'text-yellow-300': 'text-neutral-800'} w-[926px] text-base font-normal leading-9`}
                >
                  {language === "ko" ? (
                    <>
                      Sunny Braille은 텍스트 뿐만 수식도 점역해 낼 수 있는
                      수학에 특화된 점역 프로그램입니다.
                      <br />
                      해바라기 팀은 고객님이 쉽고 빠르게 원하는 교육 자료를
                      점역하고 더 많은 교육 자료의 접근성을 높이려 노력하고
                      있습니다.
                    </>
                  ) : (
                    <>
                      Sunny Braille is a transcription program specialized in
                      mathematics that can transcribe not only text but also
                      formulas.
                      <br />
                      The Sunflower team strives to quickly transcribe the
                      educational materials you want and increase accessibility
                      to more educational materials.
                    </>
                  )}
                </div>
              </div>
              <div className="w-[650px] h-[650px] top-[150px] left-[630px] relative overflow-hidden">
                <img src="img/bannerlogo.png" alt="" />
              </div>
            </div>
          )}
        </div>

        <div className="w-auto h-auto top-[80px] flex flex-col justify-center relative">
          <ConvertPageRoutingButton />
          <div
            className={`${textClassName} text-center ${
              isHighContrast ? "text-yellow-300" : "text-neutral-800"
            } text-base font-normal  my-[20px] leading-[37px]`}
          >
            {language === "ko" ? (
              <>
                원하는 교육 자료 파일을 업로드해 점자로 변환해보세요.
                <br />
                변환된 파일을 다운로드 한 후 점자정보단말기에 읽힐 수 있습니다.
              </>
            ) : (
              <>
                Upload the educational material file you want and convert it
                into Braille.
                <br />
                Download the converted file and read it on a Braille information
                terminal.
              </>
            )}
          </div>
        </div>
      </div>
      <BrailleDeco />
    </div>
  );
};

export default MainPage;
