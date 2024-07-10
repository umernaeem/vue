import api from './api'

export const todayCakeDay = () => api.get('today')

export const nextCakeDay = () => api.get('next')

export const upcomingCakeDays = () => api.get('upcoming')

export const uploadFile = uploaded_file => api.post('uploadFile',uploaded_file)