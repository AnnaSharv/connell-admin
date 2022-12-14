import create from 'zustand'

const useBlogsLength = create((set) => ({
  blogsLength: 0,
  setBlogsLength: () => set((state) => ({ blogsLength: state.blogsLength + 1 })),

}))