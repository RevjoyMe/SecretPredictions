'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { MarketCard } from './MarketCard'
import { Market } from '@/types/market'
import { Loader2, TrendingUp, Search } from 'lucide-react'

interface MarketGridProps {
  filter?: string
}

export function MarketGrid({ filter = 'trending' }: MarketGridProps) {
  const [markets, setMarkets] = useState<Market[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')

  // Mock data - replace with actual API call
  const mockMarkets: Market[] = [
    {
      id: '1',
      question: 'Will Bitcoin reach $120,000 by end of 2024?',
      description: 'Bitcoin price prediction based on major exchanges average price',
      endTime: '2024-12-31T23:59:59Z',
      state: 'active',
      totalPool: 125000,
      yesPool: 75000,
      noPool: 50000,
      category: 'crypto',
      totalBetters: 156,
      liquidity: 200000,
      creator: '0x123...',
      oracle: '0x456...',
      creationTime: '2024-08-01T00:00:00Z'
    },
    {
      id: '2',
      question: 'Will Trump win the 2024 Presidential Election?',
      description: 'Based on official election results from all 50 states',
      endTime: '2024-11-05T23:59:59Z',
      state: 'active',
      totalPool: 2500000,
      yesPool: 1400000,
      noPool: 1100000,
      category: 'politics',
      totalBetters: 1247,
      liquidity: 3200000,
      creator: '0x789...',
      oracle: '0xabc...',
      creationTime: '2024-07-15T00:00:00Z'
    },
    {
      id: '3',
      question: 'Will Ethereum reach $5,000 in 2024?',
      description: 'ETH price prediction for 2024 based on Coinbase and Binance average',
      endTime: '2024-12-31T23:59:59Z',
      state: 'active',
      totalPool: 89000,
      yesPool: 62300,
      noPool: 26700,
      category: 'crypto',
      totalBetters: 98,
      liquidity: 150000,
      creator: '0xdef...',
      oracle: '0x789...',
      creationTime: '2024-08-10T00:00:00Z'
    },
    {
      id: '4',
      question: 'Will Lakers make the NBA Playoffs 2024-25?',
      description: 'Based on official NBA standings at end of regular season',
      endTime: '2025-04-15T23:59:59Z',
      state: 'active',
      totalPool: 67000,
      yesPool: 40200,
      noPool: 26800,
      category: 'sports',
      totalBetters: 89,
      liquidity: 95000,
      creator: '0x456...',
      oracle: '0xdef...',
      creationTime: '2024-08-20T00:00:00Z'
    },
    {
      id: '5',
      question: 'Will Apple stock reach $300 by end of 2024?',
      description: 'AAPL stock price prediction based on market closing price',
      endTime: '2024-12-31T23:59:59Z',
      state: 'active',
      totalPool: 156000,
      yesPool: 93600,
      noPool: 62400,
      category: 'business',
      totalBetters: 203,
      liquidity: 220000,
      creator: '0xabc...',
      oracle: '0x123...',
      creationTime: '2024-08-05T00:00:00Z'
    },
    {
      id: '6',
      question: 'Will Russia-Ukraine war end in 2024?',
      description: 'Based on official ceasefire or peace agreement announcement',
      endTime: '2024-12-31T23:59:59Z',
      state: 'active',
      totalPool: 1890000,
      yesPool: 567000,
      noPool: 1323000,
      category: 'politics',
      totalBetters: 856,
      liquidity: 2100000,
      creator: '0x999...',
      oracle: '0x888...',
      creationTime: '2024-07-20T00:00:00Z'
    }
  ]

  useEffect(() => {
    // Simulate API call
    setLoading(true)
    setTimeout(() => {
      setMarkets(mockMarkets)
      setLoading(false)
    }, 1000)
  }, [filter])

  const filteredMarkets = markets.filter(market => {
    const matchesSearch = market.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         market.description?.toLowerCase().includes(searchQuery.toLowerCase())
    
    if (!matchesSearch) return false
    
    switch (filter) {
      case 'trending':
        return market.totalPool > 100000 // High volume markets
      case 'crypto':
        return market.category === 'crypto'
      case 'politics':
        return market.category === 'politics'
      case 'sports':
        return market.category === 'sports'
      case 'business':
        return market.category === 'business'
      case 'all':
      default:
        return true
    }
  })

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary-500 mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">Loading markets...</p>
        </div>
      </div>
    )
  }

  return (
    <div>
      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search markets..."
            className="input-field pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Markets Grid */}
      {filteredMarkets.length > 0 ? (
        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {filteredMarkets.map((market, index) => (
            <MarketCard
              key={market.id}
              market={market}
              index={index}
            />
          ))}
        </motion.div>
      ) : (
        <motion.div 
          className="text-center py-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="w-24 h-24 bg-gray-100 dark:bg-dark-800 rounded-full flex items-center justify-center mx-auto mb-4">
            <TrendingUp className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
            No markets found
          </h3>
          <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
            {searchQuery 
              ? `No markets match your search for "${searchQuery}"`
              : `No ${filter} markets available right now. Check back soon for new predictions!`
            }
          </p>
        </motion.div>
      )}

      {/* Load More Button (if needed) */}
      {filteredMarkets.length > 0 && filteredMarkets.length >= 9 && (
        <div className="text-center mt-12">
          <button className="btn-secondary">
            Load More Markets
          </button>
        </div>
      )}
    </div>
  )
}

