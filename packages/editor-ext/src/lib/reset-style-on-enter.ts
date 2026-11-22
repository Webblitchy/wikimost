import { Extension } from '@tiptap/core'

export const ResetStyleOnEnter = Extension.create({
  name: 'resetStyleOnEnter',

  addKeyboardShortcuts() {
    return {
      Enter: ({ editor }) => {

        // Keep list dot but remove other styles
        if (editor.isActive("listItem")) {
          const handled = editor.commands.splitListItem("listItem")
          if (handled) {
            editor.commands.command(({ tr }) => {
              tr.setStoredMarks([]) // Empty marks (= styles) for the newline
              return true
            })
          }
          return handled
        }

        // Otherwise remove all styles (keepMarks: false)
        return editor.commands.first(({ commands }) => [
          () => commands.newlineInCode(),
          () => commands.createParagraphNear(),
          () => commands.liftEmptyBlock(),
          () => commands.splitBlock({ keepMarks: false }),
        ])
      },
    }
  },
})
