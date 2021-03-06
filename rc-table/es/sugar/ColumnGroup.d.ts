import * as React from 'react';
import { ColumnProps } from './Column';
import { ColumnType } from '../interface';
export interface ColumnGroupProps<RecordType> extends Omit<ColumnType<RecordType>, 'children'> {
    children: React.ReactElement<ColumnProps<RecordType>> | readonly React.ReactElement<ColumnProps<RecordType>>[];
}
/**
 * This is a syntactic sugar for `columns` prop.
 * So HOC will not work on this.
 */
declare function ColumnGroup<RecordType>(_: ColumnGroupProps<RecordType>): any;
export default ColumnGroup;
