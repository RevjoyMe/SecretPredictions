'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Clock, TrendingUp, TrendingDown, Users, DollarSign, Eye, EyeOff } from 'lucide-react'
import { Market } from '@/types/market'
import { formatDistanceToNow } from 'date-fns'
import { BettingModal } from './BettingModal'

interface MarketCardProps {
  market: Market
  index?: number
}

export function MarketCard({ market, index = 0 }: MarketCardProps) {
  const [showBettingModal, setShowBettingModal] = useState(false)
  const [selectedOutcome, setSelectedOutcome] = useState<'yes' | 'no' | null>(null)

  const yesPercentage = market.yesPool > 0 ? (market.yesPool / market.totalPool) * 100 : 50
  const noPercentage = 100 - yesPercentage

  const handleBetClick = (outcome: 'yes' | 'no') => {
    setSelectedOutcome(outcome)
    setShowBettingModal(true)
  }

  const getMarketStatusBadge = () => {
    const now = new Date()
    const endTime = new Date(market.endTime)
    
    if (market.state === 'resolved') {
      return <span className="badge-resolved">Resolved</span>
    } else if (market.state === 'locked') {
      return <span className="badge-locked">Locked</span>
    } else if (endTime > now) {
      return <span className="badge-active">Active</span>
    }
    return <span className="badge-locked">Ended</span>
  }

  const getTimeRemaining = () => {
    const endTime = new Date(market.endTime)
    const now = new Date()
    
    if (endTime > now) {
      return `Ends ${formatDistanceToNow(endTime, { addSuffix: true })}`
    }
    return `Ended ${formatDistanceToNow(endTime, { addSuffix: true })}`
  }

  return (
    <>
      <motion.div
        className="market-card group"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.05 }}
        whileHover={{ y: -2 }}
        onClick={() => setShowBettingModal(true)}
      >
        {/* Card Header */}
        <div className="p-6 pb-4">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-2">
              {getMarketStatusBadge()}
              <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
                <Eye className="w-4 h-4" />
                Private
              </span>
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {getTimeRemaining()}
            </div>
          </div>

          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2 line-clamp-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
            {market.question}
          </h3>

          {market.description && (
            <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-4">
              {market.description}
            </p>
          )}
        </div>

        {/* Odds Display */}
        <div className="px-6 pb-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Market Odds
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
              <EyeOff className="w-3 h-3" />
              Positions Hidden
            </span>
          </div>

          {/* Odds Bar */}
          <div className="odds-bar mb-3">
            <div 
              className="odds-fill-yes"
              style={{ width: `${yesPercentage}%` }}
            />
          </div>

          {/* Percentage Display */}
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-success-500 rounded-full" />
              <span className="font-medium text-success-700 dark:text-success-400">
                YES {yesPercentage.toFixed(1)}%
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-medium text-danger-700 dark:text-danger-400">
                NO {noPercentage.toFixed(1)}%
              </span>
              <div className="w-3 h-3 bg-danger-500 rounded-full" />
            </div>
          </div>
        </div>

        {/* Market Stats */}
        <div className="px-6 pb-4 border-t border-gray-100 dark:border-dark-700 pt-4">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                ${(market.totalPool / 1000).toFixed(1)}K
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center justify-center gap-1">
                <DollarSign className="w-3 h-3" />
                Volume
              </div>
            </div>
            <div>
              <div className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                {market.totalBetters || '???'}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center justify-center gap-1">
                <Users className="w-3 h-3" />
                Bettors
              </div>
            </div>
            <div>
              <div className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                {market.liquidity ? `$${(market.liquidity / 1000).toFixed(1)}K` : 'High'}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center justify-center gap-1">
                <TrendingUp className="w-3 h-3" />
                Liquidity
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="p-6 pt-0">
          <div className="grid grid-cols-2 gap-3">
            <motion.button
              className="bet-button-yes"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={(e) => {
                e.stopPropagation()
                handleBetClick('yes')
              }}
            >
              <div className="flex items-center justify-center gap-2">
                <TrendingUp className="w-4 h-4" />
                <span>YES {yesPercentage.toFixed(0)}%</span>
              </div>
            </motion.button>

            <motion.button
              className="bet-button-no"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={(e) => {
                e.stopPropagation()
                handleBetClick('no')
              }}
            >
              <div className="flex items-center justify-center gap-2">
                <TrendingDown className="w-4 h-4" />
                <span>NO {noPercentage.toFixed(0)}%</span>
              </div>
            </motion.button>
          </div>
        </div>

        {/* Privacy Indicator */}
        <div className="absolute top-4 right-4 bg-primary-500 text-white text-xs px-2 py-1 rounded-full">
          🔒 FHE
        </div>
      </motion.div>

      {/* Betting Modal */}
      {showBettingModal && (
        <BettingModal
          market={market}
          selectedOutcome={selectedOutcome}
          isOpen={showBettingModal}
          onClose={() => {
            setShowBettingModal(false)
            setSelectedOutcome(null)
          }}
        />
      )}
    </>
  )
}

