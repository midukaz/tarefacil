import { ref, watch, onMounted } from 'vue'

const isDark = ref(false)

export function useTheme() {
  // Carregar tema salvo ou detectar preferência do sistema
  const loadTheme = () => {
    const saved = localStorage.getItem('tarefacil-configuracoes')
    if (saved) {
      try {
        const config = JSON.parse(saved)
        isDark.value = config.temaEscuro || false
      } catch {
        // Detectar preferência do sistema se não houver configuração salva
        isDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches
      }
    } else {
      // Detectar preferência do sistema se não houver configuração salva
      isDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches
    }
    
    applyTheme()
  }

  // Aplicar tema na tag HTML
  const applyTheme = () => {
    const html = document.documentElement
    if (isDark.value) {
      html.classList.add('dark')
    } else {
      html.classList.remove('dark')
    }
  }

  // Alternar tema
  const toggleTheme = () => {
    isDark.value = !isDark.value
    applyTheme()
    saveTheme()
  }

  // Definir tema específico
  const setTheme = (dark: boolean) => {
    isDark.value = dark
    applyTheme()
    saveTheme()
  }

  // Salvar tema no localStorage
  const saveTheme = () => {
    const saved = localStorage.getItem('tarefacil-configuracoes')
    let config = {}
    
    if (saved) {
      try {
        config = JSON.parse(saved)
      } catch {
        config = {}
      }
    }
    
    config = { ...config, temaEscuro: isDark.value }
    localStorage.setItem('tarefacil-configuracoes', JSON.stringify(config))
  }

  // Observar mudanças de preferência do sistema
  const setupSystemThemeListener = () => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    
    mediaQuery.addEventListener('change', (e) => {
      // Só aplicar se não houver preferência salva
      const saved = localStorage.getItem('tarefacil-configuracoes')
      if (!saved) {
        isDark.value = e.matches
        applyTheme()
      }
    })
  }

  // Inicializar tema quando o composable for usado
  onMounted(() => {
    loadTheme()
    setupSystemThemeListener()
  })

  return {
    isDark,
    toggleTheme,
    setTheme,
    loadTheme
  }
}

// Exportar estado reativo para uso global
export { isDark } 