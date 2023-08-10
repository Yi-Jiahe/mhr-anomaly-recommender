import React from 'react';
import { render, screen } from '@testing-library/react';
import { AfflictedMaterials } from './App';
import afflictedMaterialsList from './data/afflicted_materials.json'
import weaponAugments from './data/augments.json'

test('Upgrade Materials in Afflicted Materials', () => {
    (weaponAugments as [string, string[]][][]).forEach(augment => {
        augment.forEach(level => {
            const materials: string[] = level[1];
            materials.forEach(material => {
               expect(afflictedMaterialsList).toContain(material); 
            })
        })
    })    
})

test('Afflicted materials correspond to key', () => {
    const AfflictedMaterialsKeys = Array.from(Object.keys(AfflictedMaterials));
    afflictedMaterialsList.forEach(material => {
        expect(AfflictedMaterialsKeys).toContain(material);
    })
})