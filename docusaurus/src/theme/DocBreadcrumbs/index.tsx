import React from 'react';
import OriginalDocBreadcrumbs from '@theme-original/DocBreadcrumbs';
import type DocBreadcrumbsType from '@theme/DocBreadcrumbs';
import type {WrapperProps} from '@docusaurus/types';
import PDFDownload from '../../components/PDFDownload';

type Props = WrapperProps<typeof DocBreadcrumbsType>;

export default function DocBreadcrumbsWrapper(props: Props): JSX.Element {
  return (
    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem'}}>
      <div style={{flex: '1'}}>
        <OriginalDocBreadcrumbs {...props} />
      </div>
      <PDFDownload />
    </div>
  );
}
