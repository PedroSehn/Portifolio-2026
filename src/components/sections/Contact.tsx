import Button from '../ui/Button'
import GroupBox from '../ui/GroupBox'
import Input from '../ui/Input'
import Textarea from '../ui/Textarea'
import Window from '../ui/Window'

const contactLinks = [
  {
    label: 'GitHub',
    href: 'https://github.com/seunome',
    emoji: '🐙',
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/seunome',
    emoji: '💼',
  },
  {
    label: 'E-mail',
    href: 'mailto:oi@seuemail.com',
    emoji: '📧',
  },
]

export default function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title">
      <Window icon="✉️" title="Nova Mensagem — Outlook Express">
        <div className="grid md:grid-cols-[1.1fr,0.9fr] gap-6">
          <form className="flex flex-col gap-4" noValidate aria-label="Formulário de contato">
            <div className="grid md:grid-cols-2 gap-3">
              <Input id="contact-name" label="Nome" placeholder="Seu nome" />
              <Input id="contact-email" label="E-mail" placeholder="seu@email.com" type="email" />
            </div>
            <Input id="contact-subject" label="Assunto" placeholder="Sobre o que você quer falar?" />
            <Textarea id="contact-message" label="Mensagem" placeholder="Sua mensagem..." rows={4} />
            <Button variant="primary" type="submit">
              📤 Enviar Mensagem
            </Button>
          </form>

          <div className="flex flex-col gap-4">
            <GroupBox legend="Contatos">
              <ul className="flex flex-col gap-3 list-none p-0 m-0">
                {contactLinks.map((link) => (
                  <li key={link.label} className="flex items-center gap-3">
                    <span aria-hidden="true">{link.emoji}</span>
                    <div className="text-[10px] text-win-darker">
                      <p className="font-bold">{link.label}</p>
                      <a href={link.href} target="_blank" rel="noopener noreferrer" className="text-blue-800">
                        {link.href.replace(/^https?:\/\/(www\.)?/, '')}
                      </a>
                    </div>
                  </li>
                ))}
              </ul>
            </GroupBox>
            <div className="flex items-center gap-2 text-[11px] shadow-sunken px-3 py-2 bg-white">
              <span className="w-2 h-2 rounded-full bg-[#00cc44] shadow-[0_0_0_0_rgba(0,204,68,0.6)]" aria-hidden="true" />
              Online — resposta em até 24h
            </div>
          </div>
        </div>
      </Window>
    </section>
  )
}
