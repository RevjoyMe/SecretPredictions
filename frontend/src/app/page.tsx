'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, Shield, Eye, Zap, ArrowRight, Users, DollarSign } from 'lucide-react'
import { MarketGrid } from '@/components/markets/MarketGrid'
import { StatsCard } from '@/components/ui/StatsCard'
import { FeatureCard } from '@/components/ui/FeatureCard'
import { Hero } from '@/components/layout/Hero'
import { useAccount } from 'wagmi'

export default function HomePage() {
  const { isConnected } = useAccount()
  const [activeSection, setActiveSection] = useState('trending')

  const stats = [
    {
      label: 'Total Volume',
      value: '$2.4M',
      change: '+12.5%',
      icon: DollarSign,
      trend: 'up'
    },
    {
      label: 'Active Markets',
      value: '47',
      change: '+3',
      icon: TrendingUp,
      trend: 'up'
    },
    {
      label: 'Total Users',
      value: '8.2K',
      change: '+156',
      icon: Users,
      trend: 'up'
    },
    {
      label: 'Privacy Score',
      value: '100%',
      change: 'FHE',
      icon: Shield,
      trend: 'neutral'
    }
  ]

  const features = [
    {
      icon: Shield,
      title: 'Complete Privacy',
      description: 'All bets and positions encrypted with Zama FHE until market resolution',
      color: 'primary'
    },
    {
      icon: Eye,
      title: 'No Front-Running',
      description: 'Impossible to see positions or manipulate markets before close',
      color: 'success'
    },
    {
      icon: Zap,
      title: 'Instant Settlement',
      description: 'Automated payouts through smart contracts and oracles',
      color: 'accent'
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Hero />

      {/* Stats Section */}
      <section className="py-12 bg-white dark:bg-dark-800 border-y border-gray-200 dark:border-dark-700">
        <div className="container-grid">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <StatsCard {...stat} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50 dark:bg-dark-900">
        <div className="container-grid">
          <div className="text-center mb-12">
            <motion.h2 
              className="text-3xl lg:text-4xl font-bold mb-4 gradient-text"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              Why Secret Predictions?
            </motion.h2>
            <motion.p 
              className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              The first prediction market with true privacy. No whale watching, no manipulation, just fair predictions.
            </motion.p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
              >
                <FeatureCard {...feature} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Markets Section */}
      <section className="py-16">
        <div className="container-grid">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-2">
                Live Markets
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Predict the future with complete privacy
              </p>
            </div>

            {/* Filter Tabs */}
            <div className="flex mt-6 lg:mt-0 bg-white dark:bg-dark-800 rounded-xl p-1 border border-gray-200 dark:border-dark-700">
              {[
                { id: 'trending', label: 'Trending' },
                { id: 'crypto', label: 'Crypto' },
                { id: 'politics', label: 'Politics' },
                { id: 'sports', label: 'Sports' },
                { id: 'all', label: 'All' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveSection(tab.id)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    activeSection === tab.id
                      ? 'bg-primary-500 text-white shadow-lg'
                      : 'text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Markets Grid */}
          <MarketGrid filter={activeSection} />

          {/* Load More Button */}
          <div className="text-center mt-12">
            <button className="btn-primary inline-flex items-center gap-2 text-lg px-8 py-4">
              View All Markets
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      {!isConnected && (
        <section className="py-16 gradient-bg">
          <div className="container-grid text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-3xl mx-auto"
            >
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
                Ready to Start Predicting?
              </h2>
              <p className="text-xl text-primary-100 mb-8">
                Connect your wallet and start betting with complete privacy. 
                Your positions remain secret until market resolution.
              </p>
              <button className="bg-white text-primary-600 hover:bg-gray-100 font-semibold px-8 py-4 rounded-xl text-lg transition-all duration-200 transform hover:scale-105">
                Connect Wallet
              </button>
            </motion.div>
          </div>
        </section>
      )}
    </div>
  )
}

