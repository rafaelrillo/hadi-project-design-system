// Path: src/pages/app/ChatView/ChatView.tsx

import { useState, useRef, useEffect } from 'react';
import {
  MessageSquare,
  Send,
  Bot,
  User,
  Sparkles,
  TrendingUp,
  AlertCircle,
  Loader2,
} from 'lucide-react';
import { Button } from '@/components/atoms/Button';
import styles from './ChatView.module.css';

// ─────────────────────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────────────────────

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface SuggestedPrompt {
  icon: React.ReactNode;
  label: string;
  prompt: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// MOCK RESPONSES
// ─────────────────────────────────────────────────────────────────────────────

const MOCK_RESPONSES: Record<string, string> = {
  default: `I'm QUAFI AI, your market analysis assistant. I can help you with:

• **Market Analysis** - Get insights on market conditions and trends
• **Stock Research** - Analyze specific stocks and their fundamentals
• **Portfolio Advice** - Receive recommendations based on your risk profile
• **News Interpretation** - Understand the impact of market news

What would you like to know?`,

  market: `**Current Market Analysis**

The market is showing mixed signals today:

📈 **S&P 500**: +0.34% - Moderate bullish momentum
📊 **VIX**: 15.2 - Low volatility environment
💰 **Dollar Index**: 103.5 - Slightly stronger

**Key Observations:**
• Technology sector leading gains (+1.2%)
• Energy sector under pressure (-0.8%)
• Bond yields stable at 4.25%

**Recommendation:** Current conditions favor selective equity exposure with emphasis on quality growth stocks.`,

  portfolio: `**Portfolio Recommendations**

Based on current market conditions, here's my analysis:

**Suggested Allocation:**
• 60% Equities (focus on large-cap quality)
• 25% Fixed Income (short-duration)
• 10% Alternatives
• 5% Cash

**Top Picks This Week:**
1. **AAPL** - Strong ecosystem, AI integration potential
2. **MSFT** - Cloud dominance, enterprise AI leader
3. **JPM** - Benefiting from rate environment

**Risk Note:** Consider maintaining stop-losses at 8% below entry for new positions.`,

  nvidia: `**NVDA Analysis**

**Current Price:** $875.28
**Target Price:** $950 (12-month)
**Rating:** Strong Buy

**Bull Case:**
• AI infrastructure demand remains robust
• Data center revenue growing 200%+ YoY
• Dominant position in AI training chips

**Bear Case:**
• High valuation (P/E ~65)
• Supply chain concentration risks
• Competition from AMD, Intel, custom chips

**Technical View:**
Support at $800, resistance at $920. RSI indicates overbought conditions in short-term.

**Verdict:** Long-term fundamentals remain strong despite near-term volatility risk.`,

  risk: `**Risk Assessment**

I've analyzed your portfolio's risk profile:

**Current Risk Score:** 7.2/10 (Moderately Aggressive)

**Key Risk Factors:**
• 🔴 Sector Concentration: 45% in Technology
• 🟡 Geographic Exposure: 85% US-based
• 🟢 Liquidity: All positions highly liquid
• 🟡 Volatility: Beta of 1.3 vs S&P 500

**Recommendations:**
1. Consider adding international exposure (10-15%)
2. Reduce tech concentration to below 35%
3. Add defensive positions in utilities or healthcare

Would you like me to suggest specific rebalancing trades?`,
};

const getMockResponse = (input: string): string => {
  const lower = input.toLowerCase();

  if (lower.includes('market') || lower.includes('today') || lower.includes('conditions')) {
    return MOCK_RESPONSES.market;
  }
  if (lower.includes('portfolio') || lower.includes('allocation') || lower.includes('recommend')) {
    return MOCK_RESPONSES.portfolio;
  }
  if (lower.includes('nvidia') || lower.includes('nvda')) {
    return MOCK_RESPONSES.nvidia;
  }
  if (lower.includes('risk') || lower.includes('exposure') || lower.includes('assessment')) {
    return MOCK_RESPONSES.risk;
  }

  return MOCK_RESPONSES.default;
};

// ─────────────────────────────────────────────────────────────────────────────
// SUGGESTED PROMPTS
// ─────────────────────────────────────────────────────────────────────────────

const SUGGESTED_PROMPTS: SuggestedPrompt[] = [
  {
    icon: <TrendingUp size={16} />,
    label: 'Market Analysis',
    prompt: 'What are the current market conditions?',
  },
  {
    icon: <Sparkles size={16} />,
    label: 'Portfolio Tips',
    prompt: 'What portfolio allocation do you recommend?',
  },
  {
    icon: <AlertCircle size={16} />,
    label: 'Risk Assessment',
    prompt: 'Analyze my portfolio risk exposure',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

export function ChatView() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Handle send message
  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI thinking
    await new Promise((resolve) => setTimeout(resolve, 1000 + Math.random() * 1000));

    const assistantMessage: Message = {
      id: `assistant-${Date.now()}`,
      role: 'assistant',
      content: getMockResponse(userMessage.content),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, assistantMessage]);
    setIsTyping(false);
  };

  // Handle key press
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Handle suggested prompt
  const handleSuggestedPrompt = (prompt: string) => {
    setInput(prompt);
    inputRef.current?.focus();
  };

  return (
    <div className={styles.container}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerTitle}>
          <Bot size={24} className={styles.headerIcon} />
          <div>
            <h1 className={styles.title}>QUAFI AI</h1>
            <p className={styles.subtitle}>Your intelligent market analysis assistant</p>
          </div>
        </div>
        <div className={styles.headerBadge}>
          <Sparkles size={14} />
          <span>Beta</span>
        </div>
      </header>

      {/* Chat Area */}
      <div className={styles.chatArea}>
        {messages.length === 0 ? (
          <div className={styles.welcomeState}>
            <div className={styles.welcomeIcon}>
              <MessageSquare size={48} />
            </div>
            <h2>Welcome to QUAFI AI</h2>
            <p>Ask me anything about markets, stocks, or your portfolio</p>

            <div className={styles.suggestedPrompts}>
              {SUGGESTED_PROMPTS.map((item, index) => (
                <button
                  key={index}
                  className={styles.promptCard}
                  onClick={() => handleSuggestedPrompt(item.prompt)}
                >
                  <span className={styles.promptIcon}>{item.icon}</span>
                  <span className={styles.promptLabel}>{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className={styles.messagesList}>
            {messages.map((message) => (
              <div
                key={message.id}
                className={`${styles.message} ${styles[message.role]}`}
              >
                <div className={styles.messageAvatar}>
                  {message.role === 'user' ? (
                    <User size={18} />
                  ) : (
                    <Bot size={18} />
                  )}
                </div>
                <div className={styles.messageContent}>
                  <div className={styles.messageHeader}>
                    <span className={styles.messageSender}>
                      {message.role === 'user' ? 'You' : 'QUAFI AI'}
                    </span>
                    <span className={styles.messageTime}>
                      {message.timestamp.toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </div>
                  <div className={styles.messageText}>
                    {message.content.split('\n').map((line, i) => (
                      <p key={i}>{line || <br />}</p>
                    ))}
                  </div>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className={`${styles.message} ${styles.assistant}`}>
                <div className={styles.messageAvatar}>
                  <Bot size={18} />
                </div>
                <div className={styles.typingIndicator}>
                  <Loader2 size={16} className={styles.spinner} />
                  <span>QUAFI is thinking...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className={styles.inputArea}>
        <div className={styles.inputWrapper}>
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Ask QUAFI about markets, stocks, or your portfolio..."
            className={styles.input}
            rows={1}
            disabled={isTyping}
          />
          <Button
            variant="primary"
            onClick={handleSend}
            disabled={!input.trim() || isTyping}
            icon={<Send size={16} />}
          >
            Send
          </Button>
        </div>
        <p className={styles.disclaimer}>
          QUAFI AI provides analysis for educational purposes only. Not financial advice.
        </p>
      </div>
    </div>
  );
}
