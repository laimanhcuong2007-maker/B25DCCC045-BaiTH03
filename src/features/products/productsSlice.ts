import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { Product } from '../../types'

type RequestStatus = 'idle' | 'loading' | 'succeeded' | 'failed'

interface ProductsState {
  items: Product[]
  status: RequestStatus
  error: string | null
}

function isProduct(value: unknown): value is Product {
  if (typeof value !== 'object' || value === null) return false
  const product = value as Record<string, unknown>
  return (
    typeof product.id === 'number' &&
    typeof product.title === 'string' &&
    typeof product.price === 'number' &&
    typeof product.description === 'string' &&
    typeof product.category === 'string' &&
    typeof product.image === 'string'
  )
}

function isProductList(value: unknown): value is Product[] {
  return Array.isArray(value) && value.every(isProduct)
}

export const fetchProducts = createAsyncThunk<
  Product[],
  void,
  { rejectValue: string; state: { products: ProductsState } }
>(
  'products/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('https://fakestoreapi.com/products')
      if (!response.ok) {
        return rejectWithValue(`Không thể tải sản phẩm (mã lỗi ${response.status}).`)
      }

      const data: unknown = await response.json()
      if (!isProductList(data)) {
        return rejectWithValue('Dữ liệu sản phẩm từ máy chủ không hợp lệ.')
      }
      return data
    } catch (error: unknown) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Đã có lỗi khi tải sản phẩm.',
      )
    }
  },
  {
    condition: (_, { getState }) => getState().products.status !== 'loading',
  },
)

const initialState: ProductsState = {
  items: [],
  status: 'idle',
  error: null,
}

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.items = action.payload
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload ?? action.error.message ?? 'Không thể tải sản phẩm.'
      })
  },
})

export default productsSlice.reducer
