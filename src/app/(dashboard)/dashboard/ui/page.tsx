'use client';

import { Button, Card, Input, ColorPicker } from "@/ui"
import { useState } from 'react';
import { Plus as PlusIcon} from 'lucide-react';
import { Container } from "@/ui";



export default function HomePage() {

    const [color, setColor] = useState('rgb(251, 191, 36)'); // mango default

  return (
    <Container className="flex items-center justify-center p-4">

      <Card className="space-y-4">
        <header className="space-y-1">
          <h1 className="text-base font-semibold">UI Component Showcase</h1>
          <p className="text-xs text-muted">
            Card, input, all button variants, and icon-only buttons.
          </p>
        </header>

        {/* Input section */}
        <section className="space-y-2">
          <h2 className="text-xs font-semibold text-muted uppercase tracking-wide">
            Input
          </h2>
          <Input
            label="Task title"
            placeholder="e.g. Ship the mango demo"
            helperText="This uses the shared input preset."
          />
        </section>

        {/* Text button variants */}
        <section className="space-y-2">
          <h2 className="text-xs font-semibold text-muted uppercase tracking-wide">
            Buttons (label + optional icon)
          </h2>
          <div className="flex flex-wrap gap-3 items-center">
            <Button label="Primary" primary />
            <Button label="Soft" soft />
            <Button label="Ghost" ghost />
            <Button label="Outline" outline />
            <Button label="Danger" danger />
          </div>

          <div className="flex flex-wrap gap-3 items-center">
            <Button
              label="Add"
              primary
              icon={<PlusIcon />}
              iconPosition="left"
            />
            <Button
              label="New"
              soft
              icon={<PlusIcon />}
              iconPosition="left"
            />
            <Button
              label="Edit"
              ghost
              icon={<PlusIcon />}
              iconPosition="left"
            />
            <Button
              label="Filter"
              outline
              icon={<PlusIcon />}
              iconPosition="left"
            />
          </div>
        </section>

        {/* Icon-only buttons */}
        <section className="space-y-2">
          <h2 className="text-xs font-semibold text-muted uppercase tracking-wide">
            Icon-only buttons
          </h2>
          <p className="text-xs text-muted">
            These rely on <code>iconOnly</code> and use a square shape with a
            consistent icon size.
          </p>
          <div className="flex flex-wrap gap-3 items-center">
            <Button
              primary
              icon={<PlusIcon />}
              iconOnly
              aria-label="Add (primary)"
            />
            <Button
              soft
              icon={<PlusIcon />}
              iconOnly
              aria-label="Add (soft)"
            />
            <Button
              ghost
              icon={<PlusIcon />}
              iconOnly
              aria-label="Add (ghost)"
            />
            <Button
              outline
              icon={<PlusIcon />}
              iconOnly
              aria-label="Add (outline)"
            />
            <Button
              danger
              icon={<PlusIcon />}
              iconOnly
              aria-label="Add (danger)"
            />
          </div>
        </section>

        <section className="space-y-2">
          <h2 className="text-xs font-semibold text-muted uppercase tracking-wide">
            Colour Picker
          </h2>
          <ColorPicker value={color} onChange={setColor}/>
        </section>

      </Card>
    </Container>
  );
}