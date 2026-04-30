import { Command } from 'cmdk'
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { useCharacterStore } from '../store/characterStore'
import { copyToClipboard } from '../lib/clipboard'

export function CommandMenu() {
  const [open, setOpen] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()
  const character = useCharacterStore((state) => state.character)
  const reset = useCharacterStore((state) => state.reset)

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'k' && (event.metaKey || event.ctrlKey)) {
        event.preventDefault()
        setOpen((prev) => !prev)
      }

      if (event.key === 'Escape' && open) {
        setOpen(false)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [open])

  useEffect(() => {
    if (open) {
      inputRef.current?.focus()
    }
  }, [open])

  const runCommand = (command: () => void) => {
    setOpen(false)
    command()
  }

  const goToForge = () => {
    reset()
    navigate({ to: '/' })
  }

  const copyCharacterLink = () =>
    copyToClipboard(window.location.href, 'Link copied!', 'Share this destiny with others.')

  if (!open) return null

  return (
    <>
      <div
        className="fixed inset-0 z-[100] bg-black/72 backdrop-blur-md animate-fade-in"
        onClick={() => setOpen(false)}
      />

      <Command className="cathedral-panel fixed left-1/2 top-[16%] z-[101] w-[92vw] max-w-lg -translate-x-1/2 overflow-hidden rounded-md">
        <div className="flex items-center gap-3 border-b border-gold-500/10 px-5 py-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-gold-500"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          <Command.Input
            ref={inputRef}
            placeholder="Search the forge..."
            className="w-full bg-transparent text-sm text-gold-100 outline-none placeholder:text-gold-700"
          />
          <kbd className="rounded-md border border-gold-500/12 bg-black/20 px-2 py-1 text-[10px] text-gold-600">
            ESC
          </kbd>
        </div>

        <Command.List className="max-h-[360px] overflow-y-auto p-3">
          <Command.Empty className="px-4 py-6 text-center text-sm text-gold-700">
            No results found.
          </Command.Empty>

          <Command.Group heading="Navigation" className="px-2 py-1 text-[10px] uppercase tracking-[0.24em] text-gold-600">
            <Command.Item
              onSelect={() => runCommand(goToForge)}
              className="flex cursor-pointer items-center gap-3 rounded-md px-3 py-3 text-sm text-gold-200 data-[selected=true]:bg-gold-500/12"
            >
              <span>New Character</span>
            </Command.Item>
          </Command.Group>

          {character ? (
            <Command.Group heading="Actions" className="mt-2 px-2 py-1 text-[10px] uppercase tracking-[0.24em] text-gold-600">
              <Command.Item
                onSelect={() => runCommand(copyCharacterLink)}
                className="flex cursor-pointer items-center gap-3 rounded-md px-3 py-3 text-sm text-gold-200 data-[selected=true]:bg-gold-500/12"
              >
                <span>Copy Character Link</span>
              </Command.Item>
            </Command.Group>
          ) : null}

          <div className="mt-2 border-t border-gold-500/10 px-3 py-3 text-[10px] uppercase tracking-[0.18em] text-gold-700">
            Press Ctrl K to reopen the command forge.
          </div>
        </Command.List>
      </Command>
    </>
  )
}
