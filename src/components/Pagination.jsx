import ReactPaginate from 'react-paginate';
import './pagination.scss';

export const Pagination = ({onPageChange}) => {
  return (
    <ReactPaginate
      pageCount={10}
      onPageChange={onPageChange}
      marginPagesDisplayed={3} // 先頭と末尾に表示するページ数
      pageRangeDisplayed={2} // 現在のページの前後をいくつ表示させるか
      containerClassName="pagination justify-center" // ul(pagination本体)
      pageClassName="page-item" // li要素のクラス名
      pageLinkClassName="page-link rounded-full" // ページネーションのリンクのクラス名
      activeClassName="active" // active.li
      activeLinkClassName="active" // active.li < a
      // 戻る・進む関連
      previousClassName="page-item" // li
      nextClassName="page-item" // li
      previousLabel={'<'} // a
      previousLinkClassName="previous-link"
      nextLabel={'>'} // a
      nextLinkClassName="next-link"
      // 先頭 or 末尾に行ったときにそれ以上戻れ(進め)なくする
      disabledClassName="disabled-button d-none"
      // 中間ページの省略表記関連
      breakLabel="..."
      breakClassName="page-item"
      breakLinkClassName="page-link"
    />
  );
};
