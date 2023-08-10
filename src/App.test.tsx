import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import afflictedMaterials from './data/afflicted_materials.json'
import weaponAugments from './data/augments.json'

test('Upgrade Materials in Afflicted Materials', () => {
    (weaponAugments as [string, string[]][][]).forEach(augment => {
        augment.forEach(level => {
            const materials: string[] = level[1];
            materials.forEach(material => {
               expect(afflictedMaterials).toContain(material); 
            })
        })
    })    
})