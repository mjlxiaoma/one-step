// useTableHeadResizable.ts
import { h } from 'vue';
import VueDraggableResizable from 'vue3-draggable-resizable';
import { DraggableContainer } from 'vue3-draggable-resizable';
import 'vue3-draggable-resizable/dist/Vue3DraggableResizable.css';

export const useTableHeadResizable = (columnAttrs, props, columns) => {
  const { key } = columnAttrs;
  const { children } = props[0];

  const colIndex = columns.value.findIndex((col) => {
    const k = col.key || col.dataIndex;
    return k === key;
  });
  if (!columns.value[colIndex] || !columns.value[colIndex].width) {
    return h('th', { ...columnAttrs }, [children]);
  }

  const dragProps = {
    key: columns.value[colIndex].dataIndex || columns.value[colIndex].key,
    class: 'table-draggable-handle',
    w: 5,
    x: columns.value[colIndex].width,
    disabledY: true,
    draggable: true,
    resizable: false,
    onDragging: (e) => {
      columns.value[colIndex].width = Math.max(e.x, 1);
    },
  };

  const resizable = h(VueDraggableResizable, { ...dragProps });
  const container = h(
    DraggableContainer,
    { disabled: true, style: 'position: unset' },
    { default: () => resizable }
  );
  return h(
    'th',
    { ...columnAttrs, class: 'resize-table-th' },
    {
      default: () => [children, container],
    }
  );
};
