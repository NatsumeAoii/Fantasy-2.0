import React from 'react'
import type { Character } from '../../types'
import { CharacterShell } from './CharacterShell'

interface ProfileLayoutProps {
  character: Character
  children: React.ReactNode
  tabs: React.ReactNode
}

export const ProfileLayout: React.FC<ProfileLayoutProps> = ({ character, children, tabs }) => {
  return (
    <CharacterShell character={character} tabs={tabs}>
      {children}
    </CharacterShell>
  )
}
