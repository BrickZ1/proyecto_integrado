module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'biobio-blue': '#1E40AF',
        'biobio-green': '#047857',
        'biobio-gold': '#F59E0B',
        'biobio-cream': '#FFFBEB',
        'energia-blue': '#3B82F6',
        'energia-green': '#10B981'
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'display': ['Montserrat', 'sans-serif']
      }
    }
  },
  plugins: []
}