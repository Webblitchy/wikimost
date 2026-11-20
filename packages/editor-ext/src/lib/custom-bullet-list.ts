import BulletList from '@tiptap/extension-bullet-list'
import { wrappingInputRule } from '@tiptap/core'

// Bullet list marker without "+"
export const CustomBulletList = BulletList.extend({
  addInputRules() {
    return [
      wrappingInputRule({
        find: /^\s*([-*])\s$/, // Only - or *
        type: this.type,
      }),
    ]
  },
})
