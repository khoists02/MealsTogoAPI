/* eslint-disable */
import { Request } from 'express';
/**
* $gte equal >= greater than or equal
* $gt equal > greater than
* $lt equal < less than
* $lte equal <= less than or equal
* $eq mean equal ===
* $in match with any value in an array
* $ne mean not equal
* $nin not match with any value in an array
*/
// tslint:disable-next-line: prefer-array-literal
export const buildQueryString = (request: Request, searchFields?: string[]) => {
  const paramsObject = { ...request.query };
  // SEARCH LIKE OPERATORS
  if (searchFields && searchFields.length > 0) {
    searchFields.forEach((field: string) => {
      const value = paramsObject[field];
      if (value) {
        paramsObject[field] = { $regex: value } as any;
      }
    });
  }

  let queryString: string = JSON.stringify(paramsObject);
  queryString = queryString.replace(/\b(gte|gt|lte|le|eq|in|nin)\b/g, match => `$${match}`);
  return queryString;
};

export const sortBy = (req: Request, defaultSort = '-createdDate') => {
  const sortString = req.query.sort as string;
  // tslint:disable-next-line: no-shadowed-variable
  let sortByQuery = defaultSort;
  if (sortString) {
    const arr = sortString.split(',');
    sortByQuery = arr.join(' ');
  }
  return sortByQuery;
}

export const selectFields = (req: Request) => {
  const fieldsString = req.query.fields as string;
  let result = '-__v';
  if (fieldsString) {
    const arr = fieldsString.split(',');
    result = arr.join(' ');
  }
  return result;
}