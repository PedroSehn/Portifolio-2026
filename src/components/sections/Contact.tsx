import { useEffect, useMemo, useRef, useState } from 'react'
import Window from '../ui/Window'
import { defaultWindowMenu } from '../../constants/windowMenu'

interface ContactProps {
  isActive?: boolean
  onActivate?: () => void
}

const contactLinks = [
  {
    label: 'GitHub',
    href: 'https://github.com/PedroSehn',
    emoji: '🐙',
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/pedrosehn',
    emoji: '💼',
  },
  {
    label: 'E-mail',
    href: 'mailto:oi@pedrorsehn@hotmail.com',
    emoji: '📧',
  },
  {
    label: 'Whatsapp',
    href: 'https://wa.me/5551984574823',
    emoji: '📞',
  },
]

interface Message {
  from: 'visitor' | 'Pedro Sehn'
  text: string
  time: string
}

const WHATSAPP_NUMBER = '+5551984574823'

const getNow = () => {
  const date = new Date()
  return date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
}

export default function Contact({ isActive, onActivate }: ContactProps) {
  const scriptedMessages = useMemo<Message[]>(
    () => [
      { from: 'Pedro Sehn', text: 'Ei! Seja bem-vindo(a) ao meu portfólio 👋', time: getNow() },
      { from: 'Pedro Sehn', text: 'Me manda uma mensagem aqui embaixo!', time: getNow() },
      {
        from: 'Pedro Sehn',
        text: 'Ah! Assim que apertar em enviar, vai abrir uma nova janela te direcionando para o meu Whasapp!',
        time: getNow(),
      },
    ],
    [],
  )
  const [displayedMessages, setDisplayedMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [hasStarted, setHasStarted] = useState(false)
  const chatRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight
    }
  }, [displayedMessages, isTyping])

  useEffect(() => {
    if (!hasStarted) return
    if (displayedMessages.length >= scriptedMessages.length) {
      setIsTyping(false)
      return
    }

    setIsTyping(true)
    const timer = setTimeout(() => {
      setDisplayedMessages((prev) => [...prev, scriptedMessages[prev.length]])
      setIsTyping(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [displayedMessages.length, hasStarted, scriptedMessages])

  const sendMessage = () => {
    const text = input.trim()
    if (!text) return

    const sanitizedNumber = WHATSAPP_NUMBER.replace(/\D/g, '')
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${sanitizedNumber}&text=${encodeURIComponent(text)}`
    window.open(whatsappUrl, '_blank')
    setInput('')
  }

  const handleActivate = () => {
    if (!hasStarted) {
      setHasStarted(true)
    }
    onActivate?.()
  }

  return (
    <section id="contact" aria-labelledby="contact-title">
      <Window
        icon="💬"
        title="MSN Messenger — pedrorsehn@hotmail.com"
        menuItems={defaultWindowMenu}
        statusBar={['Online']}
        isActive={isActive}
        onActivate={handleActivate}
      >
        <div className="flex flex-col" style={{ height: 320, fontSize: 11 }}>
          <div
            className="flex items-center gap-2 px-2 py-1 mb-1"
            style={{ background: 'hsl(0 0% 95%)', fontSize: 11,  boxShadow: 'var(--sunken)', }}
          >
            <span style={{ fontSize: 16 }} aria-hidden="true">
              🧑‍💻
            </span>
            <div>
              <div className="font-bold">pedrorsehn@hotmail.com</div>
              <div style={{ fontSize: 10, color: 'hsl(120 60% 35%)' }}>
                ● Online
              </div>
            </div>
          </div>

          <div
            ref={chatRef}
            className="flex-1 overflow-y-auto win95-scroll"
            style={{
              background: 'hsl(0 0% 100%)',
              padding: 8,
              fontSize: 11,
              lineHeight: 1.5,
              boxShadow: 'var(--sunken)',
            }}
          >
            {displayedMessages.map((message, index) => (
              <div key={`message-${index}`} className="mb-2">
                <div className="flex items-baseline gap-1">
                  <span
                    className="font-bold"
                    style={{
                      color: message.from === 'Pedro Sehn' ? 'hsl(240 80% 40%)' : 'hsl(0 70% 45%)',
                    }}
                  >
                    {message.from === 'Pedro Sehn' ? 'Pedro Sehn' : 'Visitante'}
                  </span>
                  <span style={{ color: 'hsl(0 0% 50%)', fontSize: 10 }}>({message.time})</span>
                </div>
                <div className="ml-2" style={{ fontSize: 11 }}>
                  {message.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div style={{ color: 'hsl(0 0% 50%)', fontStyle: 'italic', fontSize: 10 }}>
                Pedro Sehn está digitando...
                <span className="typing-dots" aria-hidden="true">
                  <span>.</span>
                  <span>.</span>
                  <span>.</span>
                </span>
              </div>
            )}
          </div>

          <div className="flex gap-1 mt-1">
            <input
              className="flex-1 pl-3"
              type="text"
              placeholder="Digite uma mensagem..."
              value={input}
              
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  event.preventDefault()
                  sendMessage()
                }
              }}
              style={{ fontSize: 11, boxShadow: 'var(--sunken)' }}
            />
            <button
              type="button"
              className="win95-button"
              onClick={sendMessage}
              style={{ fontSize: 11, minWidth: 64 }}
            >
              Enviar
            </button>
          </div>

          <div className="flex gap-4 mt-2" style={{ borderTop: '1px solid hsl(0 0% 75%)', paddingTop: 6 }}>
            {contactLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="win95-desktop-icon"
                style={{ width: 56, color: 'hsl(0 0% 0%)' }}
              >
                <span style={{ fontSize: 18 }} aria-hidden="true">
                  {link.emoji}
                </span>
                <span className="win95-icon-label" style={{ fontSize: 10 }}>
                  {link.label}
                </span>
              </a>
            ))}
          </div>
        </div>
      </Window>
    </section>
  )
}
