import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

export const FinalMessage: React.FC = () => {
  const [phase, setPhase] = useState<"postcards" | "game" | "final">("postcards");
  const [flipped, setFlipped] = useState<number[]>([]);

  // UNO-style postcards with different colors and fun messages
  const postcards = [
    {
      color: "red",
      message: "shatakshi i feel like  we are connected in the most beautiful way, being with you just feels like home,  like a warm hug , yo're my safe place, my joy and my little piece of magic.",
      symbol: "🫶🏻"
    },
    {
      color: "yellow",
      message: "When you're all alone i'll reach for you....\nWhen you're feeling low i'll be there too..",
      symbol: "🔄"
    },
    {
      color: "green",
      message: "here's the church and here's the steeple...\nWe sure are cute for two ugly people!..",
      symbol: "💌"
    },
    {
      color: "blue",
      message: "When you go away, I still see you...\nWith sunlight on your face in my rear view",
      symbol: "☀️"
    },
    {
      color: "purple",
      message: "Isn't it just so pretty to think....\nAll along there was some Invisible string tying you to me...",
      symbol: "♾️"
    }
  ];

  const flipCard = (index: number) => {
    if (!flipped.includes(index)) {
      setFlipped([...flipped, index]);
    }
    else {
      setFlipped(flipped.filter(i => i !== index));  // Allow toggling flip back
    }
  };

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={{ background: "linear-gradient(135deg, #FFEEAD, #FAD0C4, #FBC2EB)", fontFamily: 'Comic Neue, Comic Sans MS, cursive' }}
    >
      {phase === "postcards" && (
        <motion.div
          className="w-full max-w-4xl"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <h1 className="text-4xl font-bold text-center text-red-600 mb-8 drop-shadow-md">
            Whispers of the Heart!
          </h1>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {postcards.map((card, idx) => (
              <motion.div
                key={idx}
                className={`h-48 cursor-pointer perspective-1000 ${flipped.includes(idx) ? '' : 'hover:scale-105'}`}
                onClick={() => flipCard(idx)}
                whileHover={!flipped.includes(idx) ? { scale: 1.05 } : {}}
                whileTap={!flipped.includes(idx) ? { scale: 0.95 } : {}}
              >
                <div className={`relative w-full h-full transition-transform duration-500 transform-style-preserve-3d ${
                  flipped.includes(idx) ? 'rotate-y-180' : ''
                }`}>
                  {/* Front of card - UNO style */}
                  <div className={`absolute w-full h-full rounded-xl shadow-lg flex items-center justify-center backface-hidden ${
                    card.color === "red" ? "bg-red-500" :
                    card.color === "yellow" ? "bg-yellow-400" :
                    card.color === "green" ? "bg-green-500" :
                    card.color === "blue" ? "bg-blue-500" : "bg-purple-500"
                  }`}>
                    <div className="text-white text-6xl font-bold">
                      {card.symbol}
                    </div>
                  </div>
                  
                  {/* Back of card - message */}
                  <div className={`absolute w-full h-full rounded-xl shadow-lg flex items-center justify-center p-4 backface-hidden rotate-y-180 ${
                    card.color === "red" ? "bg-red-100" :
                    card.color === "yellow" ? "bg-yellow-100" :
                    card.color === "green" ? "bg-green-100" :
                    card.color === "blue" ? "bg-blue-100" : "bg-purple-100"
                  }`}>
                    <p className="text-center text-gray-800 font-medium text-sm">
                      {card.message}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {(

            <motion.div 
              className="mt-8 flex justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <motion.button
                className="px-6 py-3 bg-gradient-to-r from-red-600 to-purple-600 text-white rounded-full shadow-lg text-lg font-bold uppercase tracking-wide"
                whileHover={{ scale: 1.05, boxShadow: "0 5px 15px rgba(0,0,0,0.2)" }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setPhase("game")}
              >
                Special Message For You →
              </motion.button>
            </motion.div>
          )}
        </motion.div>
      )}

      {phase === "game" && (
        <motion.div
          className="flex flex-col items-center"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <h2 className="text-3xl font-bold text-red-600 mb-6 text-center drop-shadow-sm">
            REVEAL YOUR SPECIAL MESSAGE!
          </h2>
          
          <div className="relative w-64 h-64 bg-white/80 rounded-xl shadow-lg flex items-center justify-center mb-8">
            <motion.div
              className="cursor-pointer absolute"
              drag
              dragConstraints={{
                top: -100,
                left: -100,
                right: 100,
                bottom: 100
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setPhase("final")}
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            >
              <Heart size={90} className="text-red-500 drop-shadow-lg" fill="currentColor" />
            </motion.div>
          </div>
          
          <p className="text-gray-700 font-medium">
            
          </p>
        </motion.div>
      )}

      {phase === "final" && (
        <motion.div
          className="max-w-2xl bg-white/95 backdrop-blur-md p-8 rounded-2xl shadow-2xl"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <motion.div
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 10, -10, 0]
            }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="flex justify-center mb-6"
          >
            <Heart className="text-red-500" size={48} fill="currentColor" />
          </motion.div>
          
          <h1 className="text-4xl font-bold text-center text-red-600 mb-6">
            💌 HAPPY BIRTHDAY CUTIEEE!!! 💌
          </h1>
          <p className="text-lg text-gray-800 leading-relaxed font-semibold text-center">HEYOOOO SHATAXII HAHAA 😭🎀💗 </p>
          <p className="text-lg text-gray-800 leading-relaxed font-semibold text-center">HAPPIEST BIRTHDAY TO MY cutest, most gorgeous, craziest, kindest, loving and most beautiful soul in this whole world — MY DUMB LOVING FUNNY PARTNER (who give me taana me like a mother does, strict but FULL OF LOVE ) I LOVE YOU SOOOOO MUCHHHH 🫶🏻🎀💗</p>
          <p className="text-lg text-gray-800 leading-relaxed font-semibold text-center">Bhaiii, I feel so blessed to have you in my life shatakshi 🎀 I genuinely can’t be more grateful. Youre not just a person to me — Youre my soulmate, my best friend, my peace, my family, my love, my therapist when life gets heavy, my safe place, my laughter, my light in the dark... You’re literally EVERYTHING — shatakshi youre everything i ever needed.a complete package(dabba). With you in my life, I don’t need anything else. You're not just a part of my life... You are my LIFE. YOU ARE MY HOME FOREVER. 🎀💗</p>
          
          <p className="text-lg text-gray-800 leading-relaxed font-semibold text-center">Even on my worst days, just a few moments talking to you or being near you melts all the heaviness awayy asf lmao its like your presence quietly stitches me back together, I forgot i was ever hurting. lmao THAATS YOUR MAGIC JANU and yes I actually forget I was ever upset. That’s your aura, janu "Good question" haha. (my fav line) If we were two sunflowers I would have faced you instead of sun!! and cutiee it means because your light is all i'd ever need. A day without you feels incomplete, it feels hollow Like someone's stolen the very  soul from my body. you just complete my days... you complete me shatakshi</p>

          <p className="text-lg text-gray-800 leading-relaxed font-semibold text-center">I used to hate myself so much before I met you, iwas drowing in my own thoughts sometimes i still do. But then YOU happened my love, you saw the in me when i couldn't see it myself. You became my reason to become a better person, to believe in love, in life, in me, in us. Everything I do  my passion, my wins, my growth, my every single shits  It’s all dedicated YOU. Bhai DAMN, I literally FOUND A REASON TO LIVE, you gave me reason to live, to dream. And i swear i'll neveer stop being grateful for you. Thanks for coming in my life again💌  </p>
          <p className="text-lg text-gray-800 leading-relaxed font-semibold text-center">I don’t care about the world — as long as I have you sofii. JUST BE HAPPY bhai.THATS ALL I EVER WANT. It breaks me to see you sad or crying. You’ll always have me, no matter what, no matter when. And if you’re ever feeling low, I’ll try my absolute best to lift you up like roman reigns lifts everyone up haha . shatakshi Please don’t suffer alone dont suffer in silence it breaks me into pieces. I know everyone has problems, and maybe I can’t fix everything… But you don’t deserve to go through it alone, WE WILL SUFFER AND FIGHT TOGETHER SHATAXI. You deserve every bit of happiness in this whole damn world.  </p>
          <p className="text-lg text-gray-800 leading-relaxed font-semibold text-center"> Bhai, you are fucking important to me  more than you even realize!  Your presence fills my life with immeasurable joyyyy, and your love wraps my heart in a warmth that I can’t explain, "to your joy, i tether". i just want you to know that you are cherished, valued, and loved beyond measure. Every moment spent with you is a fucking treasuree JACKPOT HAHA, and I am endlessly grateful for having you in my life. </p>
          <p className="text-lg text-gray-800 leading-relaxed font-semibold text-center">I want to experience every adventure of life with you by my side, because you are my home, and without you, I feel homesick (like a dukkar). And shatakshi no place can give me the same level of comfort and warmth that you do. what could I possibly want, if I have you with me all the time? IWANNABE WITH YOU TILLREST OF MY LIFE🎀 Bhai, you made me feel loved, acknowledged, and showered me with the affection I’ve always longed for. I can’t even begin to express how thankful I am for you, YOU COMPLETE ME. 💌😭Just thinking about it brings tears to my eyes. I would do anything and everything to make you happy — because you mean the world to me CUTIEE. 💖 </p>
          <p className="text-lg text-gray-800 leading-relaxed font-semibold text-center">wishing you the HAPPIEST BIRTHDAY Filled with all the joys and happiness in the world! 💖🎉  </p>
              
          
          
          <div className="mt-8 flex justify-center">
            <motion.div
              className="text-2xl font-bold bg-gradient-to-r from-red-500 to-purple-500 bg-clip-text text-transparent"
              animate={{
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            >
             I LOVE YOU DHEEEEEEEERRR SAAARAAA!(more than you ofc)💌
            </motion.div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};