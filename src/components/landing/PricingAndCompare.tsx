'use client'

import { useState } from "react";
import { Check, Minus, Star } from "lucide-react";
import Link from "next/link";

export function PricingAndCompare() {
  const [rent, setRent] = useState<number>(2500);
  const [fee, setFee] = useState<number>(10);
  
  // Usando o plano Controle para a conta do simulador (conservador)
  const alughoMonthlyCost = 49.90;
  
  const currentMonthlyCost = rent * (fee / 100);
  const currentAnnualCost = currentMonthlyCost * 12;
  const alughoAnnualCost = alughoMonthlyCost * 12;
  
  const monthlySavings = Math.max(0, currentMonthlyCost - alughoMonthlyCost);
  const annualSavings = Math.max(0, currentAnnualCost - alughoAnnualCost);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
  };

  return (
    <>
      {/* Comparison Table Section */}
      <section id="comparativo" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-4">
              Compare as alternativas
            </h2>
            <p className="text-lg text-slate-600">
              Veja por que o Alugho é a escolha mais inteligente para proprietários independentes.
            </p>
          </div>

          <div className="overflow-x-auto rounded-3xl border border-slate-200 shadow-sm bg-white">
            <table className="w-full min-w-[800px] text-left border-collapse">
              <thead>
                <tr>
                  <th className="p-6 bg-slate-50 border-b border-r border-slate-200 w-1/4">
                    <span className="text-lg font-bold text-slate-900">Funcionalidade</span>
                  </th>
                  <th className="p-6 bg-white border-b border-r border-slate-200 w-1/4">
                    <div className="font-bold text-slate-600 mb-1">Planilha / WhatsApp</div>
                    <div className="text-xs uppercase font-bold text-slate-400 tracking-widest">Manual</div>
                  </th>
                  <th className="p-6 bg-white border-b border-r border-slate-200 w-1/4">
                    <div className="font-bold text-slate-600 mb-1">Imobiliária</div>
                    <div className="text-xs uppercase font-bold text-slate-400 tracking-widest">Custa 8-10%</div>
                  </th>
                  <th className="p-6 bg-emerald-50 border-b border-emerald-100 w-1/4 relative overflow-hidden">
                    <div className="relative z-10">
                      <div className="font-black text-emerald-700 text-xl mb-1">Alugho</div>
                      <div className="text-xs uppercase font-bold text-emerald-600 tracking-widest">Mensalidade fixa</div>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {[
                  { label: "Custo mensal", manual: "R$ 0 (custa tempo)", imo: "Alta (Percentual)", alugho: "Baixa (Mensalidade fixa)" },
                  { label: "Cobrança Automática", manual: false, imo: true, alugho: true },
                  { label: "Área do Inquilino", manual: false, imo: true, alugho: true },
                  { label: "Histórico de Pagamentos", manual: false, imo: true, alugho: true },
                  { label: "Gestão de Chamados", manual: false, imo: true, alugho: true },
                  { label: "Lembretes via WhatsApp", manual: false, imo: false, alugho: true },
                  { label: "Controle Total do Proprietário", manual: true, imo: false, alugho: true },
                ].map((row, i) => (
                  <tr key={i} className="hover:bg-slate-50 transition-colors">
                    <td className="p-5 px-6 border-r border-slate-200 text-sm font-semibold text-slate-700 bg-slate-50/50">
                      {row.label}
                    </td>
                    <td className="p-5 px-6 border-r border-slate-200 text-center">
                      {typeof row.manual === 'string' ? <span className="text-slate-500 text-sm font-medium">{row.manual}</span> : row.manual ? <Check className="w-5 h-5 text-slate-400 mx-auto" /> : <Minus className="w-5 h-5 text-slate-300 mx-auto" />}
                    </td>
                    <td className="p-5 px-6 border-r border-slate-200 text-center">
                      {typeof row.imo === 'string' ? <span className="text-slate-500 text-sm font-medium">{row.imo}</span> : row.imo ? <Check className="w-5 h-5 text-slate-400 mx-auto" /> : <Minus className="w-5 h-5 text-slate-300 mx-auto" />}
                    </td>
                    <td className="p-5 px-6 bg-emerald-50/30 text-center border-l-2 border-l-emerald-500">
                      {typeof row.alugho === 'string' ? <span className="text-emerald-700 font-bold text-sm">{row.alugho}</span> : row.alugho ? <div className="w-5 h-5 bg-emerald-500/20 rounded flex items-center justify-center text-emerald-600 text-xs font-bold mx-auto">✓</div> : <Minus className="w-5 h-5 text-emerald-200 mx-auto" />}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Pricing and Calculator Section */}
      <section id="planos" className="py-24 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-4">
              Preço simples, calcule a economia
            </h2>
            <p className="text-lg text-slate-600">
              Você não é sócio do sistema. Pague apenas pelo software, sem taxas sobre o valor do seu aluguel.
            </p>
          </div>

          {/* Calculator - Moved to Top */}
          <div className="bg-slate-50 rounded-3xl p-8 border border-slate-200 flex flex-col lg:flex-row gap-12 mb-16 shadow-sm">
            <div className="flex-1">
              <h3 className="text-2xl font-black text-slate-900 mb-2 tracking-tight">Simulador de Economia</h3>
              <p className="text-sm text-slate-600 mb-8">Descubra quanto você está perdendo hoje (comparado ao nosso plano Controle).</p>
              
              <div className="space-y-8">
                <div>
                  <div className="flex justify-between items-end mb-4">
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest">
                      Valor do aluguel
                    </label>
                    <div className="text-xl font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-lg">
                      {formatCurrency(rent)}
                    </div>
                  </div>
                  <div className="relative">
                    <div className="absolute top-1/2 left-0 w-full h-2 bg-emerald-500 rounded-lg -translate-y-1/2 pointer-events-none" style={{ width: `${((rent - 500) / 9500) * 100}%` }}></div>
                    <input 
                      type="range" 
                      min="500"
                      max="10000"
                      step="100"
                      value={rent} 
                      onChange={(e) => setRent(Number(e.target.value))}
                      className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600 relative z-10 bg-transparent [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-emerald-600 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-md"
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-end mb-4">
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest">
                      Taxa da imobiliária
                    </label>
                    <div className="text-xl font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-lg">
                      {fee}%
                    </div>
                  </div>
                  <div className="relative">
                    <div className="absolute top-1/2 left-0 w-full h-2 bg-emerald-500 rounded-lg -translate-y-1/2 pointer-events-none" style={{ width: `${(fee / 15) * 100}%` }}></div>
                    <input 
                      type="range"
                      min="0"
                      max="15"
                      step="1"
                      value={fee} 
                      onChange={(e) => setFee(Number(e.target.value))}
                      className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600 relative z-10 bg-transparent [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-emerald-600 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-md"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex-1 bg-white rounded-2xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 flex flex-col justify-center">
              <div className="flex items-center justify-between mb-6 pb-6 border-b border-slate-100">
                <div>
                  <p className="text-xs text-slate-400 uppercase font-bold">Custo Atual (Ano)</p>
                  <p className="text-xl font-bold text-slate-400 line-through">{formatCurrency(currentAnnualCost)}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-emerald-600 uppercase font-bold">Economia Anual</p>
                  <p className="text-3xl font-black text-emerald-600">{formatCurrency(annualSavings)}</p>
                </div>
              </div>
              <div className="flex justify-between items-center text-base font-medium text-slate-600">
                <span>Economia Mensal:</span>
                <span className="text-emerald-600 font-bold">{formatCurrency(monthlySavings)}</span>
              </div>
            </div>
          </div>

          {/* Pricing Cards Grid */}
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            
            {/* Plano Essencial */}
            <div className="bg-white rounded-3xl p-8 border border-slate-200 flex flex-col shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:-translate-y-1 transition-transform duration-300">
              <div className="mb-8">
                <span className="px-2 py-1 bg-slate-100 text-slate-600 rounded text-[10px] font-bold uppercase tracking-widest">Para quem está começando</span>
                <h3 className="text-2xl font-bold mt-4 text-slate-900">Plano Essencial</h3>
                <h2 className="text-4xl font-black mt-2 text-slate-900">R$ 29,90<span className="text-sm font-medium text-slate-500"> /mês</span></h2>
                <p className="text-sm text-slate-500 mt-2">por imóvel cadastrado</p>
              </div>

              <ul className="space-y-4 mb-10 flex-1">
                <li className="flex items-start gap-3 text-sm text-slate-700">
                  <div className="w-5 h-5 mt-0.5 bg-emerald-500/10 rounded flex items-center justify-center text-emerald-600 text-xs font-bold shrink-0">✓</div>
                  <span>Cobrança automática via Pix</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-slate-700">
                  <div className="w-5 h-5 mt-0.5 bg-emerald-500/10 rounded flex items-center justify-center text-emerald-600 text-xs font-bold shrink-0">✓</div>
                  <span>Notificações e lembretes por WhatsApp</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-slate-700">
                  <div className="w-5 h-5 mt-0.5 bg-emerald-500/10 rounded flex items-center justify-center text-emerald-600 text-xs font-bold shrink-0">✓</div>
                  <span>Área exclusiva para o inquilino acessar faturas</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-slate-400 opacity-60">
                  <div className="w-5 h-5 mt-0.5 bg-slate-100 rounded flex items-center justify-center text-slate-400 text-xs font-bold shrink-0">✕</div>
                  <span>Gestão de chamados de manutenção</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-slate-400 opacity-60">
                  <div className="w-5 h-5 mt-0.5 bg-slate-100 rounded flex items-center justify-center text-slate-400 text-xs font-bold shrink-0">✕</div>
                  <span>Alugho Score de Pontualidade</span>
                </li>
              </ul>

              <Link 
                href="/signup" 
                className="w-full py-4 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-2xl text-center transition-colors block"
              >
                Garantir 1º mês grátis
              </Link>
            </div>

            {/* Plano Controle (Recomendado) */}
            <div className="bg-slate-900 rounded-3xl p-8 text-white relative overflow-hidden flex flex-col shadow-[0_20px_50px_rgba(16,185,129,0.15)] border border-emerald-900/50 hover:-translate-y-1 transition-transform duration-300 transform md:-scale-y-100 md:scale-y-100 md:scale-105 z-10">
              <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
              
              <div className="mb-8 relative z-10">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-1 bg-emerald-500/20 text-emerald-400 rounded text-[10px] font-bold uppercase tracking-widest flex items-center gap-1">
                    <Star className="w-3 h-3 fill-emerald-400" /> Recomendado
                  </span>
                </div>
                <h3 className="text-2xl font-bold mt-4 text-white">Plano Controle</h3>
                <h2 className="text-4xl font-black mt-2 text-white">R$ 49,90<span className="text-sm font-normal text-slate-400"> /mês</span></h2>
                <p className="text-sm text-slate-400 mt-2">por imóvel cadastrado</p>
              </div>

              <ul className="space-y-4 mb-10 flex-1 relative z-10">
                <li className="flex items-start gap-3 text-sm text-slate-200">
                  <div className="w-5 h-5 mt-0.5 bg-emerald-500/20 rounded flex items-center justify-center text-emerald-400 text-xs font-bold shrink-0">✓</div>
                  <span>Tudo do Plano Essencial, plus:</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-slate-200">
                  <div className="w-5 h-5 mt-0.5 bg-emerald-500/20 rounded flex items-center justify-center text-emerald-400 text-xs font-bold shrink-0">✓</div>
                  <span>Gestão completa de chamados de manutenção</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-slate-200">
                  <div className="w-5 h-5 mt-0.5 bg-emerald-500/20 rounded flex items-center justify-center text-emerald-400 text-xs font-bold shrink-0">✓</div>
                  <span>Alugho Score de Pontualidade do inquilino</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-slate-200">
                  <div className="w-5 h-5 mt-0.5 bg-emerald-500/20 rounded flex items-center justify-center text-emerald-400 text-xs font-bold shrink-0">✓</div>
                  <span>Extratos e relatórios financeiros unificados</span>
                </li>
              </ul>

              <Link 
                href="/signup" 
                className="w-full py-4 bg-white hover:bg-slate-50 text-slate-900 font-bold rounded-2xl text-center transition-colors block relative z-10"
              >
                Garantir 1º mês grátis
              </Link>
            </div>

          </div>
          <p className="text-center text-xs text-slate-500 font-semibold uppercase tracking-wider mt-8">Sem fidelidade. Cancele quando quiser.</p>
        </div>
      </section>
    </>
  );
}
