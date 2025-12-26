import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface Upgrade {
  id: number;
  name: string;
  cost: number;
  multiplier: number;
  icon: string;
}

const Index = () => {
  const [score, setScore] = useState(0);
  const [clickMultiplier, setClickMultiplier] = useState(1);
  const [birdAnimating, setBirdAnimating] = useState(false);
  const [scoreAnimating, setScoreAnimating] = useState(false);
  const [upgrades] = useState<Upgrade[]>([
    { id: 1, name: 'Золотое перо', cost: 10, multiplier: 2, icon: 'Feather' },
    { id: 2, name: 'Крылья турбо', cost: 50, multiplier: 5, icon: 'Zap' },
    { id: 3, name: 'Супер клюв', cost: 200, multiplier: 10, icon: 'Award' },
    { id: 4, name: 'Космическая птица', cost: 500, multiplier: 25, icon: 'Rocket' },
    { id: 5, name: 'Мега сила', cost: 1000, multiplier: 50, icon: 'Crown' },
  ]);

  const handleBirdClick = () => {
    setScore(score + clickMultiplier);
    setBirdAnimating(true);
    setScoreAnimating(true);
    setTimeout(() => setBirdAnimating(false), 300);
    setTimeout(() => setScoreAnimating(false), 400);
  };

  const handleUpgrade = (upgrade: Upgrade) => {
    if (score >= upgrade.cost) {
      setScore(score - upgrade.cost);
      setClickMultiplier(clickMultiplier + upgrade.multiplier);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-200 via-pink-200 to-orange-200 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-5xl md:text-7xl font-black text-purple-900 mb-2 drop-shadow-lg">
            🐦 Птичий Кликер
          </h1>
          <p className="text-xl md:text-2xl text-purple-700 font-semibold">
            Кликай и прокачивайся!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <Card className="p-8 bg-white/90 backdrop-blur-sm shadow-2xl border-4 border-purple-300">
              <div className="text-center mb-8">
                <div className={`text-6xl md:text-8xl font-black bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 bg-clip-text text-transparent mb-2 ${scoreAnimating ? 'animate-pop-in' : ''}`}>
                  {score}
                </div>
                <div className="text-2xl md:text-3xl font-bold text-purple-600">
                  очков
                </div>
                <div className="text-lg md:text-xl text-purple-500 font-semibold mt-2">
                  +{clickMultiplier} за клик
                </div>
              </div>

              <div className="flex justify-center">
                <button
                  onClick={handleBirdClick}
                  className={`relative group transition-all duration-300 hover:scale-105 focus:outline-none ${birdAnimating ? 'animate-bounce-click' : ''}`}
                >
                  <div className="absolute -inset-4 bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 rounded-full blur-xl opacity-50 group-hover:opacity-75 transition-opacity animate-pulse-slow"></div>
                  <img
                    src="https://cdn.poehali.dev/projects/4c031d77-6c09-4fd1-97d6-98d3d8ad9ce7/files/27764886-5f1c-4994-a55f-255c8c3af224.jpg"
                    alt="Птичка"
                    className="relative w-64 h-64 md:w-80 md:h-80 object-contain animate-float cursor-pointer select-none"
                  />
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-6xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    ✨
                  </div>
                </button>
              </div>
            </Card>
          </div>

          <div className="lg:col-span-1">
            <Card className="p-6 bg-white/90 backdrop-blur-sm shadow-2xl border-4 border-orange-300">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-pink-500 rounded-full flex items-center justify-center">
                  <Icon name="TrendingUp" className="text-white" size={24} />
                </div>
                <h2 className="text-3xl font-black text-orange-600">
                  Улучшения
                </h2>
              </div>

              <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
                {upgrades.map((upgrade) => {
                  const canAfford = score >= upgrade.cost;
                  return (
                    <Button
                      key={upgrade.id}
                      onClick={() => handleUpgrade(upgrade)}
                      disabled={!canAfford}
                      className={`w-full h-auto p-4 transition-all duration-300 ${
                        canAfford
                          ? 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 shadow-lg hover:shadow-xl hover:scale-105'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed opacity-60'
                      }`}
                    >
                      <div className="flex items-center gap-3 w-full">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${canAfford ? 'bg-white/20' : 'bg-gray-400'}`}>
                          <Icon name={upgrade.icon as any} size={24} className="text-white" />
                        </div>
                        <div className="flex-1 text-left">
                          <div className="font-bold text-lg text-white">
                            {upgrade.name}
                          </div>
                          <div className="text-sm text-white/90">
                            +{upgrade.multiplier} к клику
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-black text-xl text-yellow-300">
                            {upgrade.cost}
                          </div>
                          <div className="text-xs text-white/80">очков</div>
                        </div>
                      </div>
                    </Button>
                  );
                })}
              </div>
            </Card>
          </div>
        </div>

        <div className="text-center">
          <Card className="inline-block p-6 bg-white/80 backdrop-blur-sm border-4 border-blue-300">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                <Icon name="Target" className="text-white" size={32} />
              </div>
              <div className="text-left">
                <div className="text-sm text-blue-600 font-semibold">
                  Множитель клика
                </div>
                <div className="text-4xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  x{clickMultiplier}
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
