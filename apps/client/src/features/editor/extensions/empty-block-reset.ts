import { Extension } from "@tiptap/core";
import { Plugin, PluginKey } from "@tiptap/pm/state";

export const EmptyBlockReset = Extension.create({
  name: "emptyBlockReset",

  addProseMirrorPlugins() {
    return [
      new Plugin({
        key: new PluginKey("emptyBlockReset"),

        props: {
          handleKeyDown: (view, event) => {
            console.log("key");
            if (event.key !== "Backspace") return false;

            const { state, dispatch } = view;
            const { selection, schema } = state;
            const { $from, empty } = selection;

            if (!empty) return false;

            // cursor not at start of line
            if ($from.parentOffset !== 0) return false;

            const block = $from.parent;

            if (block.content.size > 0) return false;

            const resetTypes = new Set([
              "heading",
              "bulletList",
              "orderedList",
              "listItem",
              "taskItem",
              "blockquote",
            ]);

            if (!resetTypes.has(block.type.name)) return false;

            const tr = state.tr;

            const pos = $from.before();

            // Remove empty node
            tr.delete(pos, pos + block.nodeSize);

            // Create normal text paragraph
            const paragraph = schema.nodes.paragraph.create();

            tr.insert(pos, paragraph);

            dispatch(tr);
            console.log("reset");
            return true;
          },
        },
      }),
    ];
  },
});