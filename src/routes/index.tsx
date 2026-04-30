import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useRef } from 'react'
import { useForm } from 'react-hook-form'
import { valibotResolver } from '@hookform/resolvers/valibot'
import * as v from 'valibot'
import { FaDiceD20 } from 'react-icons/fa'
import { ForgeHero } from '../components/Landing/ForgeHero'
import { buildCharacterDestination } from './buildCharacterDestination'

export const Route = createFileRoute('/')({
  component: WelcomeScreen,
})

const CharacterFormSchema = v.object({
  name: v.optional(v.string()),
  seed: v.optional(v.string()),
})

type FormData = v.InferInput<typeof CharacterFormSchema>

const currentYear = new Date().getFullYear()

export function WelcomeScreen() {
  const navigate = useNavigate()
  const lastSubmitRef = useRef(0)

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: valibotResolver(CharacterFormSchema),
    defaultValues: { name: '', seed: '' },
  })

  const handleRandomName = () => {
    const names = ['Eldric', 'Kaelen', 'Lyra', 'Thorne', 'Isolde', 'Vael', 'Zephyr', 'Seraphina', 'Orion', 'Calista']
    setValue('name', names[Math.floor(Math.random() * names.length)])
  }

  const onSubmit = (data: FormData) => {
    // eslint-disable-next-line react-hooks/purity -- Date.now() is called in a submit handler, not during render.
    const now = Date.now()
    if (now - lastSubmitRef.current < 300) return
    lastSubmitRef.current = now

    navigate(buildCharacterDestination(data))
  }

  return (
    <div className="flex min-h-[82vh] w-full items-center justify-center px-4 py-6">
      <div className="relative w-full max-w-2xl space-y-5 animate-fade-in">
        <ForgeHero />

        <section className="cathedral-panel group mx-auto max-w-lg overflow-hidden rounded-md p-5 md:p-6">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-gold-500/45 to-transparent"
          />

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <label
                htmlFor="name"
                className="flex items-center justify-between pl-1 text-xs uppercase tracking-[0.28em] text-text-secondary"
              >
                <span>Fate's Name</span>
                <span className="text-[10px] text-gold-600/60">Optional</span>
              </label>
              <div className="flex gap-2">
                <div className={`cathedral-field flex-1 rounded-md px-4 py-2.5 ${errors.name ? 'border-red-500/60' : ''}`}>
                  <input
                    {...register('name')}
                    id="name"
                    placeholder="Optional name"
                    maxLength={100}
                    title="Optional character name"
                    className="w-full bg-transparent text-parchment-100 placeholder:text-text-placeholder focus:shadow-none focus:outline-none"
                  />
                </div>
                <button
                  type="button"
                  onClick={handleRandomName}
                  className="cathedral-button-secondary flex h-10 w-10 shrink-0 items-center justify-center rounded-md px-0 text-sm"
                  aria-label="Roll Random Name"
                  title="Roll a random name"
                >
                  <FaDiceD20 aria-hidden="true" className="h-4 w-4" />
                </button>
              </div>
              {errors.name ? (
                <p className="animate-fade-in pl-1 text-left text-xs text-red-300">
                  Warning: {errors.name.message}
                </p>
              ) : null}
            </div>

            <div className="space-y-2">
              <label
                htmlFor="seed"
                className="flex items-center justify-between pl-1 text-xs uppercase tracking-[0.28em] text-text-secondary"
              >
                <span>World Seed</span>
                <span className="text-[10px] text-gold-600/60">Optional</span>
              </label>
              <div className={`cathedral-field rounded-md px-4 py-2.5 ${errors.seed ? 'border-red-500/60' : ''}`}>
                <input
                  {...register('seed')}
                  id="seed"
                  placeholder="Optional seed"
                  maxLength={512}
                  title="Optional seed for repeatable generation"
                  className="w-full bg-transparent font-mono text-sm text-parchment-100 placeholder:text-text-placeholder focus:shadow-none focus:outline-none"
                />
              </div>
              {errors.seed ? (
                <p className="animate-fade-in pl-1 text-left text-xs text-red-300">
                  Warning: {errors.seed.message}
                </p>
              ) : null}
              <p className="pl-1 text-left text-[11px] uppercase tracking-[0.18em] text-gold-600/70">
                Same seed always generates the exact same character.
              </p>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              title="Generate character"
              className="cathedral-button-primary shadow-accent w-full rounded-md px-6 py-3 text-sm uppercase tracking-[0.30em] disabled:cursor-not-allowed disabled:opacity-55"
            >
              {isSubmitting ? <span className="animate-pulse">Forging Soul...</span> : 'Roll The Bones'}
            </button>
          </form>
        </section>

        <div className="flex items-center justify-center gap-2.5 text-center font-mono text-[11px] uppercase tracking-[0.20em] text-text-muted">
          <span>Character Fantasy Generator</span>
          <span aria-hidden="true">.</span>
          <span aria-label="copyright">&copy;</span>
          <span aria-hidden="true">.</span>
          <span>{currentYear}</span>
        </div>
      </div>
    </div>
  )
}
