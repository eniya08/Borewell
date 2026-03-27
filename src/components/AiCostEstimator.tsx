import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, CalculatorIcon, Droplets } from 'lucide-react';

const AiCostEstimator = () => {
  const [depth, setDepth] = useState<number | ''>('');
  const [soilType, setSoilType] = useState<'normal' | 'hard'>('normal');
  const [locationType, setLocationType] = useState<'village' | 'town' | 'city'>('village');
  const [motorRequired, setMotorRequired] = useState<boolean>(false);
  
  const [estimatedCost, setEstimatedCost] = useState<{
    drilling: number;
    hardRockExtra: number;
    transport: number;
    motor: number;
    total: number;
  } | null>(null);

  const calculateCost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!depth || depth <= 0) return;

    const baseDrillingCost = depth * 180;
    const hardRockExtra = soilType === 'hard' ? depth * 70 : 0;
    
    let transportCost = 0;
    if (locationType === 'village') transportCost = 3000;
    else if (locationType === 'town') transportCost = 2000;
    else if (locationType === 'city') transportCost = 1000;

    const motorCost = motorRequired ? 15000 : 0;

    const total = baseDrillingCost + hardRockExtra + transportCost + motorCost;

    setEstimatedCost({
      drilling: baseDrillingCost,
      hardRockExtra,
      transport: transportCost,
      motor: motorCost,
      total
    });
  };

  return (
    <section id="estimator" className="py-20 bg-slate-50 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-100 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-cyan-100 rounded-full blur-3xl opacity-50 translate-y-1/2 -translate-x-1/2"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#0B2545] flex items-center justify-center gap-3">
            <CalculatorIcon className="text-[#133C55]" size={36} />
            AI Borewell Cost Estimator
          </h2>
          <p className="mt-4 text-slate-600 max-w-2xl mx-auto">
            Get an instant AI-powered estimation for your borewell drilling project based on depth, soil condition, and location.
          </p>
        </div>

        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-xl p-6 md:p-8 border border-blue-50"
          >
            <form onSubmit={calculateCost} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-[#133C55] mb-2">Expected Drilling Depth (feet)</label>
                <input 
                  type="number" 
                  min="1"
                  required
                  value={depth}
                  onChange={(e) => setDepth(e.target.value ? Number(e.target.value) : '')}
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
                  placeholder="e.g. 300"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#133C55] mb-2">Soil Type</label>
                <div className="grid grid-cols-2 gap-4">
                  <button 
                    type="button"
                    onClick={() => setSoilType('normal')}
                    className={`p-3 rounded-lg border-2 font-medium transition-all ${soilType === 'normal' ? 'border-[#386FA4] bg-blue-50 text-[#133C55]' : 'border-slate-100 bg-slate-50 text-slate-500 hover:bg-slate-100'}`}
                  >
                    Normal Soil
                  </button>
                  <button 
                    type="button"
                    onClick={() => setSoilType('hard')}
                    className={`p-3 rounded-lg border-2 font-medium transition-all ${soilType === 'hard' ? 'border-[#386FA4] bg-blue-50 text-[#133C55]' : 'border-slate-100 bg-slate-50 text-slate-500 hover:bg-slate-100'}`}
                  >
                    Hard Rock
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#133C55] mb-2">Location Type</label>
                <div className="grid grid-cols-3 gap-3">
                  <button 
                    type="button"
                    onClick={() => setLocationType('village')}
                    className={`p-3 rounded-lg border-2 font-medium text-sm transition-all ${locationType === 'village' ? 'border-[#386FA4] bg-blue-50 text-[#133C55]' : 'border-slate-100 bg-slate-50 text-slate-500 hover:bg-slate-100'}`}
                  >
                    Village
                  </button>
                  <button 
                    type="button"
                    onClick={() => setLocationType('town')}
                    className={`p-3 rounded-lg border-2 font-medium text-sm transition-all ${locationType === 'town' ? 'border-[#386FA4] bg-blue-50 text-[#133C55]' : 'border-slate-100 bg-slate-50 text-slate-500 hover:bg-slate-100'}`}
                  >
                    Town
                  </button>
                  <button 
                    type="button"
                    onClick={() => setLocationType('city')}
                    className={`p-3 rounded-lg border-2 font-medium text-sm transition-all ${locationType === 'city' ? 'border-[#386FA4] bg-blue-50 text-[#133C55]' : 'border-slate-100 bg-slate-50 text-slate-500 hover:bg-slate-100'}`}
                  >
                    City
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#133C55] mb-2 flex items-center justify-between">
                  <span>Motor Installation Required?</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-slate-500">No</span>
                    <button 
                      type="button"
                      onClick={() => setMotorRequired(!motorRequired)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${motorRequired ? 'bg-[#386FA4]' : 'bg-slate-300'}`}
                    >
                      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${motorRequired ? 'translate-x-6' : 'translate-x-1'}`} />
                    </button>
                    <span className="text-sm font-medium text-[#133C55]">Yes</span>
                  </div>
                </label>
              </div>

              <button 
                type="submit"
                className="w-full py-4 bg-gradient-to-r from-[#133C55] to-[#386FA4] text-white font-bold rounded-lg shadow-md hover:shadow-lg hover:from-[#0B2545] hover:to-[#133C55] transition-all transform hover:-translate-y-0.5"
              >
                Calculate Estimation
              </button>
            </form>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col justify-center"
          >
            {estimatedCost ? (
              <div className="bg-[#133C55] text-white rounded-2xl shadow-xl overflow-hidden decoration-break-clone">
                <div className="p-6 md:p-8">
                  <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                    <Droplets className="text-[#91E5F6]" /> Estimated Breakdown
                  </h3>
                  
                  <div className="space-y-4 mb-8">
                    <div className="flex justify-between items-center pb-3 border-b border-white/10">
                      <span className="text-white/80">Base Drilling Cost (₹180/ft)</span>
                      <span className="font-semibold text-lg">₹{estimatedCost.drilling.toLocaleString()}</span>
                    </div>
                    {estimatedCost.hardRockExtra > 0 && (
                      <div className="flex justify-between items-center pb-3 border-b border-white/10">
                        <span className="text-white/80">Hard Rock Surcharge (₹70/ft)</span>
                        <span className="font-semibold text-lg text-[#91E5F6]">+ ₹{estimatedCost.hardRockExtra.toLocaleString()}</span>
                      </div>
                    )}
                    <div className="flex justify-between items-center pb-3 border-b border-white/10">
                      <span className="text-white/80">Transportation ({locationType})</span>
                      <span className="font-semibold text-lg">₹{estimatedCost.transport.toLocaleString()}</span>
                    </div>
                    {estimatedCost.motor > 0 && (
                      <div className="flex justify-between items-center pb-3 border-b border-white/10">
                        <span className="text-white/80">Motor Installation</span>
                        <span className="font-semibold text-lg">₹{estimatedCost.motor.toLocaleString()}</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="bg-[#0B2545] p-6 rounded-xl border border-white/5">
                    <div className="flex justify-between items-end">
                      <span className="text-white/80 font-medium">Final Estimated Total</span>
                      <span className="text-4xl font-black text-[#59A5D8]">₹{estimatedCost.total.toLocaleString()}</span>
                    </div>
                  </div>
                  
                  <p className="mt-6 text-sm text-center text-white/60 italic bg-black/10 p-3 rounded-lg border border-white/5">
                    * Final cost may vary after site inspection.
                  </p>
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center p-8 border-2 border-dashed border-slate-200 rounded-2xl bg-white/50 backdrop-blur-sm">
                <Calculator className="w-16 h-16 text-slate-300 mb-4" />
                <h3 className="text-xl font-bold text-[#133C55] mb-2">Awaiting Inputs</h3>
                <p className="text-slate-500">
                  Fill out the parameters on the left and click calculate to see your AI-generated estimate.
                </p>
              </div>
            )}
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default AiCostEstimator;
