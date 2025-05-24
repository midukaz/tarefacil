import { ref, watch, onMounted } from 'vue'

const isDark = ref(false)
const isInitialized = ref(false)

export function useTheme() {
  // Carregar tema salvo ou detectar preferência do sistema
  const loadTheme = () => {
    try {
      const saved = localStorage.getItem('tarefacil-configuracoes')
      let themePreference = null
      
      if (saved) {
        const config = JSON.parse(saved)
        themePreference = config.temaEscuro
      }
      
      // Se não há preferência salva, usar a do sistema
      if (themePreference === null || themePreference === undefined) {
        themePreference = window.matchMedia('(prefers-color-scheme: dark)').matches
      }
      
      isDark.value = Boolean(themePreference)
      applyTheme()
      isInitialized.value = true
    } catch (error) {
      console.warn('Erro ao carregar tema, usando preferência do sistema:', error)
      // Fallback para preferência do sistema
      isDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches
      applyTheme()
      isInitialized.value = true
    }
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
    if (isDark.value !== dark) {
      isDark.value = dark
      applyTheme()
      saveTheme()
    }
  }

  // Salvar tema no localStorage
  const saveTheme = () => {
    try {
      const saved = localStorage.getItem('tarefacil-configuracoes')
      let config = {}
      
      if (saved) {
        config = JSON.parse(saved)
      }
      
      config = { ...config, temaEscuro: isDark.value }
      localStorage.setItem('tarefacil-configuracoes', JSON.stringify(config))
    } catch (error) {
      console.error('Erro ao salvar tema:', error)
    }
  }

  // Observar mudanças de preferência do sistema
  const setupSystemThemeListener = () => {
    try {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
      
      const handleSystemThemeChange = (e: MediaQueryListEvent) => {
        // Só aplicar se não houver preferência específica salva
        const saved = localStorage.getItem('tarefacil-configuracoes')
        if (!saved) {
          isDark.value = e.matches
          applyTheme()
        } else {
          try {
            const config = JSON.parse(saved)
            // Se não há configuração de tema específica, usar a do sistema
            if (config.temaEscuro === null || config.temaEscuro === undefined) {
              isDark.value = e.matches
              applyTheme()
            }
          } catch {
            // Se erro ao parsear, usar preferência do sistema
            isDark.value = e.matches
            applyTheme()
          }
        }
      }
      
      mediaQuery.addEventListener('change', handleSystemThemeChange)
      
      // Retornar função de cleanup
      return () => {
        mediaQuery.removeEventListener('change', handleSystemThemeChange)
      }
    } catch (error) {
      console.warn('Erro ao configurar listener do sistema:', error)
      return () => {} // Função vazia como fallback
    }
  }

  // Sincronizar com configurações externas
  const syncWithConfig = (config: any) => {
    if (config && typeof config.temaEscuro === 'boolean') {
      setTheme(config.temaEscuro)
    }
  }

  // Inicializar apenas uma vez
  const initialize = () => {
    if (!isInitialized.value) {
      loadTheme()
      setupSystemThemeListener()
    }
  }

  // Auto-inicializar quando usado em componente
  onMounted(() => {
    initialize()
  })

  return {
    isDark,
    isInitialized,
    toggleTheme,
    setTheme,
    loadTheme,
    initialize,
    syncWithConfig
  }
}

// Exportar estado reativo para uso global
export { isDark, isInitialized } 