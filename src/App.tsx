import { useEffect, useState } from 'react'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'

import Aside from './components/Aside'
import api from './services/api'

import styles from './App.module.css'
import './global.css'

interface Data {
  content: Product[]
  pageNumber: number
  pageSize: number
  totalElements: number
  totalPage: number
}

interface Product {
  ncm: string
  id_loja: number
  qtd_produto: number
  data_vencimento: string
}

function App() {
  const [pagination, setPagination] = useState({
    pageNumber: 0,
    pageSize: 15,
  } as Omit<Data, 'content'>)
  const [products, setProducts] = useState([] as Product[])
  // const [filteredProducts, setFilteredProducts] = useState([] as Product[])
  const [search, setSearch] = useState('')
  const [query, setQuery] = useState('')

  const formatDate = (dateString: string) => {
    const date = new Date(Date.parse(dateString))
    return new Intl.DateTimeFormat('pt-BR').format(date)
  }

  useEffect(() => {
    async function loadProducts() {
      const response = await api.get<Data>(
        `/api/product/store/2?page=${pagination.pageNumber}&pageSize=${
          pagination.pageSize
        }${search && `&query=${search}`}`
      )
      if (response.data) {
        setPagination({ ...response.data })
        setProducts(response.data.content)
        // setFilteredProducts(response.data.content)
      }
    }
    loadProducts()
  }, [search, pagination.pageNumber, pagination.pageSize])

  return (
    <>
      <Aside productQty={pagination.totalElements} />
      <div className={styles.app}>
        <div className={styles.content}>
          <div className={styles.searchInput}>
            <input value={query} onChange={(e) => setQuery(e.target.value)} />
            <button onClick={() => setSearch(query)}>Pesquisar</button>
          </div>
          <table>
            <thead>
              <tr>
                <th>Produto</th>
                <th>Quantidade</th>
                <th>Vencimento</th>
              </tr>
            </thead>
            <tbody>
              {products.map((item) => (
                <tr key={`${item.ncm}${item.data_vencimento}`}>
                  <td>{item.ncm}</td>
                  <td>{item.qtd_produto}</td>
                  <td>{formatDate(item.data_vencimento)}</td>
                </tr>
              ))}
              {/* {[...Array(15).keys()].map((i) => (
                <tr key={i}>
                  <td>Coca cola 200ml</td>
                  <td>1500 fardos</td>
                  <td>22/03/2024</td>
                </tr>
              ))} */}
            </tbody>
          </table>
          <div className={styles.pagination}>
            {pagination.pageNumber !== 0 && (
              <>
                <button
                  onClick={() => {
                    setPagination((old) => ({
                      ...old,
                      pageNumber: old.pageNumber - 1,
                    }))
                  }}
                  className={`${styles.paginationButton}`}
                >
                  <FaArrowLeft />
                </button>
                <button className={styles.paginationButton}>
                  {pagination.pageNumber}
                </button>
              </>
            )}

            <button
              className={`${styles.paginationButton}
                  ${styles.paginationButtonActive}`}
            >
              {pagination.pageNumber + 1}
            </button>
            {pagination.pageNumber !== pagination.totalPage && (
              <>
                <button className={styles.paginationButton}>
                  {pagination.pageNumber + 2}
                </button>
                <button
                  onClick={() => {
                    setPagination((old) => ({
                      ...old,
                      pageNumber: old.pageNumber + 1,
                    }))
                  }}
                  className={styles.paginationButton}
                >
                  <FaArrowRight />
                </button>
              </>
            )}
          </div>
          {/* <div className={styles.pagination}>
            <button
              className={`${styles.paginationButton}
                  ${styles.paginationButtonDisabled}`}
            >
              <FaArrowLeft />
            </button>
            <button
              className={`${styles.paginationButton}
                  ${styles.paginationButtonActive}`}
            >
              1
            </button>
            <button className={styles.paginationButton}>2</button>
            <button className={styles.paginationButton}>3</button>
            <button className={styles.paginationButton}>
              <FaArrowRight />
            </button>
          </div> */}
        </div>
      </div>
    </>
  )
}

export default App
