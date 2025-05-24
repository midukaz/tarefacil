import { ref, watch, onMounted } from 'vue'

type ThemeMode = 'light' | 'dark' | 'system'

const themeMode = ref<ThemeMode>('system')
const isDark = ref(false)
const isInitialized = ref(false)

export function useTheme() {
  // Verificar preferência do sistema
  const getSystemPreference = (): boolean => {
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  }

  // Aplicar tema baseado no modo atual
  const applyCurrentTheme = () => {
    let shouldBeDark = false
    
    switch (themeMode.value) {
      case 'light':
        shouldBeDark = false
        break
      case 'dark':
        shouldBeDark = true
        break
      case 'system':
        shouldBeDark = getSystemPreference()
        break
    }
    
    isDark.value = shouldBeDark
    applyTheme()
  }

  // Carregar tema salvo ou detectar preferência do sistema
  const loadTheme = () => {
    try {
      const saved = localStorage.getItem('tarefacil-configuracoes')
      let savedThemeMode: ThemeMode = 'system'
      
      if (saved) {
        const config = JSON.parse(saved)
        
        // Migrar de configuração antiga (boolean) para nova (string)
        if (typeof config.temaEscuro === 'boolean') {
          savedThemeMode = config.temaEscuro ? 'dark' : 'light'
        } else if (config.temaMode && ['light', 'dark', 'system'].includes(config.temaMode)) {
          savedThemeMode = config.temaMode
        }
      }
      
      themeMode.value = savedThemeMode
      applyCurrentTheme()
      isInitialized.value = true
    } catch (error) {
      console.warn('Erro ao carregar tema, usando preferência do sistema:', error)
      // Fallback para preferência do sistema
      themeMode.value = 'system'
      applyCurrentTheme()
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

  // Alternar tema (manter para compatibilidade)
  const toggleTheme = () => {
    if (themeMode.value === 'light') {
      setThemeMode('dark')
    } else if (themeMode.value === 'dark') {
      setThemeMode('system')
    } else {
      setThemeMode('light')
    }
  }

  // Definir modo de tema específico
  const setThemeMode = (mode: ThemeMode) => {
    if (themeMode.value !== mode) {
      themeMode.value = mode
      applyCurrentTheme()
      saveTheme()
    }
  }

  // Definir tema específico (manter para compatibilidade)
  const setTheme = (dark: boolean) => {
    setThemeMode(dark ? 'dark' : 'light')
  }

  // Salvar tema no localStorage
  const saveTheme = () => {
    try {
      const saved = localStorage.getItem('tarefacil-configuracoes')
      let config = {}
      
      if (saved) {
        config = JSON.parse(saved)
      }
      
      // Salvar novo formato e remover antigo
      config = { 
        ...config, 
        temaMode: themeMode.value,
        temaEscuro: isDark.value // Manter para compatibilidade
      }
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
        // Só aplicar se estiver no modo system
        if (themeMode.value === 'system') {
          isDark.value = e.matches
          applyTheme()
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
    if (config) {
      // Novo formato
      if (config.temaMode && ['light', 'dark', 'system'].includes(config.temaMode)) {
        setThemeMode(config.temaMode)
      }
      // Formato antigo para compatibilidade
      else if (typeof config.temaEscuro === 'boolean') {
        setThemeMode(config.temaEscuro ? 'dark' : 'light')
      }
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
    themeMode,
    isDark,
    isInitialized,
    toggleTheme,
    setTheme,
    setThemeMode,
    loadTheme,
    initialize,
    syncWithConfig
  }
}

// Exportar estado reativo para uso global
export { themeMode, isDark, isInitialized } 