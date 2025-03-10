import { API_BASE_URL } from "@/config/constants"

export async function fetchApi<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    })

    // Primero obtenemos el texto de la respuesta
    const responseText = await response.text()

    // Intentamos parsear como JSON
    let data
    try {
      data = JSON.parse(responseText)
    } catch (e) {
      console.log("Respuesta no-JSON recibida:")
      console.log(responseText)
      throw new Error("La respuesta del servidor no es un JSON válido. Ver consola para detalles.")
    }

    // Si la respuesta no es exitosa, lanzamos un error con los detalles
    if (!response.ok) {
      console.error("Error API:", data)
      throw new Error(data.error || data.message || `Error ${response.status}: ${response.statusText}`)
    }

    return data as T
  } catch (error) {
    console.error("Error en fetchApi:", error)
    throw error
  }
}

interface ApiResponse<T> {
  data: T[]
}

export interface Service {
  id: number
  name: string
}

export interface RegisterResponse {
  success: boolean
  message: string
  token?: string
  data?: any
}

export const api = {
  services: {
    list: () => fetchApi<ApiResponse<Service>>("/services"),
  },
  verification: {
    sendCode: (phoneNumber: string) =>
      fetchApi<{ success: boolean; message?: string; error?: string; details?: any }>(`/verify/whatsapp`, {
        method: "POST",
        body: JSON.stringify({ numero: phoneNumber }),
      }),
    checkCode: (phoneNumber: string, code: string) =>
      fetchApi<{ success: boolean; message?: string; error?: string }>("/verify/check", {
        method: "POST",
        body: JSON.stringify({ numero: phoneNumber, codigo: code }),
      }),
  },
  professional: {
    register: (data: any) =>
      fetchApi<RegisterResponse>("/profesionales", {
        method: "POST",
        body: JSON.stringify({
          servicio_id: data.service,
          ubicacion_texto: data.zone,
          latitud: data.lat,
          longitud: data.lng,
          nombre: data.names,
          apellido: data.lastNames,
          edad: data.age,
          whatsapp: data.whatsapp,
          clave: data.password,
        }),
      }),
  },
}

