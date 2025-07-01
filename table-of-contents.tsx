'use client'

import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface TocItem {
  id: string
  text: string
  level: number
}

export interface TableOfContentsTheme {
  primaryColor?: string
  backgroundColor?: string
  borderColor?: string
  textColor?: string
  mutedTextColor?: string
  hoverColor?: string
  fontFamily?: string
  fontSize?: {
    title?: string
    level1?: string
    level2?: string
    level3Plus?: string
  }
}

interface TableOfContentsProps {
  content: string
  title: string
  theme?: TableOfContentsTheme
  className?: string
  position?: 'left' | 'right'
  offsetTop?: number
  offsetSide?: number
  maxWidth?: number
  minWidth?: number
}

const defaultTheme: TableOfContentsTheme = {
  primaryColor: '#3b82f6',
  backgroundColor: 'rgba(255, 255, 255, 0.9)',
  borderColor: '#e5e7eb',
  textColor: '#111827',
  mutedTextColor: '#6b7280',
  hoverColor: '#f3f4f6',
  fontFamily: 'system-ui, -apple-system, sans-serif',
  fontSize: {
    title: '14px',
    level1: '14px',
    level2: '13px',
    level3Plus: '12px'
  }
}

export function TableOfContents({ 
  content, 
  title, 
  theme = {},
  className = '',
  position = 'left',
  offsetTop = 160,
  offsetSide = 32,
  maxWidth = 280,
  minWidth = 200
}: TableOfContentsProps) {
  const [tocItems, setTocItems] = useState<TocItem[]>([])
  const [activeId, setActiveId] = useState<string>('')
  const [isHovered, setIsHovered] = useState(false)

  const mergedTheme = { ...defaultTheme, ...theme }

  useEffect(() => {
    // 解析 markdown 內容中的標題，排除 code block 內的內容
    const items: TocItem[] = []
    
    // 先移除所有的 code block (fenced 和 indented)
    let cleanContent = content
    
    // 移除 fenced code blocks (```...```)
    cleanContent = cleanContent.replace(/```[\s\S]*?```/g, '')
    
    // 移除 inline code (`...`)
    cleanContent = cleanContent.replace(/`[^`]*`/g, '')
    
    // 移除 indented code blocks (行首4個空格或1個tab)
    cleanContent = cleanContent.replace(/^(    |\t).*/gm, '')
    
    // 現在在清理後的內容中尋找標題
    const headingRegex = /^(#{1,6})\s+(.+)$/gm
    let match

    while ((match = headingRegex.exec(cleanContent)) !== null) {
      const level = match[1].length
      const text = match[2].trim()
      
      // 確保不是空標題或只有特殊字符
      if (text && text.length > 0) {
        const id = text
          .toLowerCase()
          .replace(/[^a-z0-9\u4e00-\u9fa5]+/g, '-')
          .replace(/(^-|-$)/g, '')
        
        // 確保 id 不為空
        if (id) {
          items.push({ id, text, level })
        }
      }
    }

    setTocItems(items)
  }, [content])

  useEffect(() => {
    // 監聽滾動事件，更新當前活動的標題
    const handleScroll = () => {
      const headings = tocItems.map(item => document.getElementById(item.id)).filter(Boolean)
      
      // 找到當前視窗中最接近頂部的標題
      let currentActiveId = ''
      
      for (let i = 0; i < headings.length; i++) {
        const heading = headings[i]
        if (heading) {
          const rect = heading.getBoundingClientRect()
          // 如果標題在視窗上方 120px 內，或者已經通過了視窗頂部
          if (rect.top <= 120) {
            currentActiveId = tocItems[i].id
          } else {
            break
          }
        }
      }
      
      setActiveId(currentActiveId)
    }

    // 初始執行一次
    handleScroll()
    
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [tocItems])

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (tocItems.length === 0) return null

  const containerStyle: React.CSSProperties = {
    position: 'fixed',
    [position]: `${offsetSide}px`,
    top: `${offsetTop}px`,
    zIndex: 50,
    fontFamily: mergedTheme.fontFamily
  }

  return (
    <div 
      className={`hidden lg:block ${className}`}
      style={containerStyle}
    >
      <motion.div
        className="relative"
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        {/* 摺疊狀態：根據標題層級顯示長短不同的線條 */}
        <AnimatePresence>
          {!isHovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '4px',
                padding: '12px',
                cursor: 'pointer'
              }}
            >
              {tocItems.map((item, index) => {
                const isActive = activeId === item.id
                // 根據標題層級設定線條長度
                const lineWidth = item.level === 1 ? 28 : 
                                item.level === 2 ? 22 : 
                                item.level === 3 ? 18 : 
                                item.level === 4 ? 14 : 
                                item.level === 5 ? 12 : 10
                
                return (
                  <div
                    key={item.id}
                    style={{
                      height: '2px',
                      width: `${lineWidth}px`,
                      borderRadius: '1px',
                      backgroundColor: isActive 
                        ? mergedTheme.primaryColor 
                        : `${mergedTheme.mutedTextColor}40`,
                      transition: 'all 0.3s ease',
                      filter: isActive ? 'drop-shadow(0 1px 2px rgba(0, 0, 0, 0.1))' : 'none'
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.backgroundColor = `${mergedTheme.mutedTextColor}66`
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.backgroundColor = `${mergedTheme.mutedTextColor}40`
                      }
                    }}
                  />
                )
              })}
            </motion.div>
          )}
        </AnimatePresence>

        {/* 展開狀態：完整目錄 */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, x: position === 'left' ? -10 : 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: position === 'left' ? -10 : 10 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              style={{
                position: 'absolute',
                [position]: 0,
                top: 0,
                backgroundColor: mergedTheme.backgroundColor,
                backdropFilter: 'blur(4px)',
                border: `1px solid ${mergedTheme.borderColor}`,
                borderRadius: '8px',
                padding: '16px',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                minWidth: `${minWidth}px`,
                maxWidth: `${maxWidth}px`
              }}
            >
              <button 
                onClick={scrollToTop}
                style={{
                  fontSize: mergedTheme.fontSize?.title,
                  fontWeight: '600',
                  color: mergedTheme.textColor,
                  marginBottom: '12px',
                  transition: 'color 0.2s ease',
                  textAlign: 'left',
                  width: '100%',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0
                }}
                title={title}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = mergedTheme.primaryColor || '#3b82f6'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = mergedTheme.textColor || '#111827'
                }}
              >
                {title}
              </button>
              <nav style={{ 
                maxHeight: '60vh', 
                overflowY: 'auto'
              }}>
                {tocItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToHeading(item.id)}
                    style={{
                      display: 'block',
                      width: '100%',
                      textAlign: 'left',
                      fontSize: item.level === 1 
                        ? mergedTheme.fontSize?.level1 
                        : item.level === 2 
                        ? mergedTheme.fontSize?.level2 
                        : mergedTheme.fontSize?.level3Plus,
                      transition: 'all 0.2s ease',
                      paddingTop: '4px',
                      paddingBottom: '4px',
                      paddingLeft: `${(item.level - 1) * 12 + 8}px`,
                      paddingRight: '8px',
                      borderRadius: '4px',
                      color: activeId === item.id 
                        ? mergedTheme.primaryColor 
                        : mergedTheme.mutedTextColor,
                      backgroundColor: activeId === item.id 
                        ? `${mergedTheme.primaryColor}1a` 
                        : 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap'
                    }}
                    onMouseEnter={(e) => {
                      if (activeId !== item.id) {
                        e.currentTarget.style.color = mergedTheme.textColor || '#111827'
                        e.currentTarget.style.backgroundColor = mergedTheme.hoverColor || '#f3f4f6'
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (activeId !== item.id) {
                        e.currentTarget.style.color = mergedTheme.mutedTextColor || '#6b7280'
                        e.currentTarget.style.backgroundColor = 'transparent'
                      }
                    }}
                  >
                    {item.text}
                  </button>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
} 