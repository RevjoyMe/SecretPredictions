'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Shield, Eye, TrendingUp } from 'lucide-react'
import { ConnectButton } from '@rainbow-me/rainbowkit'

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-72 h-72 bg-white rounded-full filter blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-white rounded-full filter blur-3xl" />
      </div>

      <div className="relative container-grid py-20 lg:py-32">
        <div className="text-center">
          {/* Badge */}
          <motion.div
            className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Shield className="w-4 h-4" />
            Powered by Zama FHE
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            className="text-4xl lg:text-6xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            The First{' '}
            <span className="bg-white text-primary-600 px-4 py-2 rounded-2xl">
              Private
            </span>
            <br />
            Prediction Market
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="text-xl lg:text-2xl text-primary-100 mb-8 max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Bet on future events with complete privacy. Your positions remain encrypted 
            until market resolution. No whale watching, no front-running, just fair predictions.
          </motion.p>

          {/* Feature Pills */}
          <motion.div
            className="flex flex-wrap justify-center gap-4 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            {[
              { icon: Eye, text: 'Hidden Positions' },
              { icon: Shield, text: 'FHE Encryption' },
              { icon: TrendingUp, text: 'Fair Markets' }
            ].map((feature, index) => (
              <div
                key={feature.text}
                className="flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm"
              >
                <feature.icon className="w-4 h-4" />
                {feature.text}
              </div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <ConnectButton.Custom>
              {({
                account,
                chain,
                openAccountModal,
                openChainModal,
                openConnectModal,
                authenticationStatus,
                mounted,
              }) => {
                const ready = mounted && authenticationStatus !== 'loading'
                const connected =
                  ready &&
                  account &&
                  chain &&
                  (!authenticationStatus || authenticationStatus === 'authenticated')

                return (
                  <div
                    {...(!ready && {
                      'aria-hidden': true,
                      style: {
                        opacity: 0,
                        pointerEvents: 'none',
                        userSelect: 'none',
                      },
                    })}
                  >
                    {(() => {
                      if (!connected) {
                        return (
                          <button
                            onClick={openConnectModal}
                            className="bg-white text-primary-600 hover:bg-gray-100 font-semibold px-8 py-4 rounded-xl text-lg transition-all duration-200 transform hover:scale-105 inline-flex items-center gap-2"
                          >
                            Start Predicting
                            <ArrowRight className="w-5 h-5" />
                          </button>
                        )
                      }

                      if (chain.unsupported) {
                        return (
                          <button 
                            onClick={openChainModal} 
                            className="bg-danger-500 text-white font-semibold px-8 py-4 rounded-xl text-lg"
                          >
                            Wrong network
                          </button>
                        )
                      }

                      return (
                        <div className="flex gap-4">
                          <button
                            onClick={openAccountModal}
                            className="bg-white text-primary-600 hover:bg-gray-100 font-semibold px-6 py-4 rounded-xl transition-all duration-200"
                          >
                            {account.displayName}
                          </button>
                          <button className="bg-success-500 hover:bg-success-600 text-white font-semibold px-8 py-4 rounded-xl text-lg transition-all duration-200 transform hover:scale-105 inline-flex items-center gap-2">
                            Browse Markets
                            <ArrowRight className="w-5 h-5" />
                          </button>
                        </div>
                      )
                    })()}
                  </div>
                )
              }}
            </ConnectButton.Custom>

            <button className="text-white hover:text-primary-100 font-medium flex items-center gap-2 transition-colors">
              Learn more about FHE
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="grid grid-cols-3 gap-8 max-w-lg mx-auto mt-16 pt-8 border-t border-white/20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            {[
              { value: '100%', label: 'Private' },
              { value: '$2.4M', label: 'Volume' },
              { value: '8.2K', label: 'Users' }
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-primary-200 text-sm">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-1 h-8 bg-white/30 rounded-full" />
      </motion.div>
    </section>
  )
}

