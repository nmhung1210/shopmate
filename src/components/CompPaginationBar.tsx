import React from 'react';
import { ButtonGroup, ButtonToolbar, Pagination } from 'react-bootstrap';

interface IPaginationBarProps {
  count: number;
  page: number;
  limit: number;
  showCount: number;
  onPage?: (p: number) => void;
}

export default function CompPaginationBar (props: IPaginationBarProps) {
  const pageCount = Math.ceil(props.count / props.limit);
  const showCount = Math.min(props.showCount, pageCount);
  const page = props.page;
  const items = Array.from(Array(pageCount + 1).keys()).slice(1);
  let leftEllipsis = false;
  let rightEllipsis = false;
  while (items.length > showCount) {
    if (items[items.length - 2] > page) {
      items.splice(-2, 1);
      rightEllipsis = true;
    }
    if (items[1] < page && items.length > showCount) {
      items.splice(1, 1);
      leftEllipsis = true;
    }
  }
  if (leftEllipsis) {
    items.splice(1, 0, -1);
  }
  if (rightEllipsis) {
    items.splice(-1, 0, -1);
  }

  return (
    <Pagination>
      <Pagination.First onClick={() => props.onPage && props.onPage(1)} />
      {items.map((p, index) => {
        return p > 0 ? (
          <Pagination.Item
            style={{ boxShadow: 'none' }}
            onClick={() => props.onPage && props.onPage(p)}
            active={p === page}>
            {p}
          </Pagination.Item>
        ) : (
          <Pagination.Ellipsis disabled />
        );
      })}
      <Pagination.Last onClick={() => props.onPage && props.onPage(pageCount)} />
    </Pagination>
  );
}
