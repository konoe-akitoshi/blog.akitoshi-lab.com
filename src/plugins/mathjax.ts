import { onMounted } from 'vue'

export default function useMathJax() {
  onMounted(() => {
    const script = document.createElement('script')
    script.setAttribute('src', 'https://cdnjs.cloudflare.com/ajax/libs/mathjax/3.2.0/es5/tex-chtml.min.js')
    document.head.appendChild(script)
  })
}