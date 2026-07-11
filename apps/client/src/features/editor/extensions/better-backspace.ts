/*
Extension to have a better "Backspace" handling
 - On headers: replace by paragraph instead of removing the line
 - On lists, backspace decrement and at first level replace list by paragraph
*/

import { Extension, findParentNode } from "@tiptap/core";
import { Plugin, PluginKey } from "@tiptap/pm/state";
import { liftListItem } from "@tiptap/pm/schema-list";

export const BetterBackspace = Extension.create({
  name: "betterBackspace",

  addProseMirrorPlugins() {
    return [
      new Plugin({
        key: new PluginKey("betterBackspace"),

        props: {
          handleKeyDown: (view, event) => {
            if (event.key !== "Backspace") return false;


            const { state, dispatch } = view;
            const { selection, schema } = state;
            const { $from, empty } = selection;

            if (!empty) return false;

            // Cursor not at start of line
            if ($from.parentOffset !== 0) return false;

            const currBlock = $from.parent;

            // Only if empty
            if (currBlock.content.size > 0) return false;

            const tr = state.tr;

            // Replace heading node by paragraph
            if (currBlock.type.name === "heading") {
              tr.setNodeMarkup(
                $from.before(),
                state.schema.nodes.paragraph
              );
              dispatch(tr);
              return true;
            }

            const list = findParentNode(
              node => ["bulletList","orderedList","taskList"].includes(node.type.name)
            )(selection);

            if (list) {
              // remove the bullet if list.depth === 1
              // otherwise de-indent the bullet
                return liftListItem(state.schema.nodes.listItem)(
                  state,
                  dispatch,
                );
            }

            return false;
          },
        },
      }),
    ];
  },
});
