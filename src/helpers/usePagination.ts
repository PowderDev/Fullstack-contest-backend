import { Request } from 'express';

export default function usePagination(query: Request['query']) {
  let page: number | undefined = Number(query.page);
  let take: number | undefined = Number(query.take);

  page = Number.isNaN(page) ? undefined : page;
  take = Number.isNaN(take) ? undefined : take;

  return { page, take };
}
