'use client'

import { AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ErrorPageProps {
  message?: string
  onRetry?: () => void
}

export default function ErrorPage({ 
  message = "Ocurrio un error, intenta refrescar la pagina", 
  onRetry 
}: ErrorPageProps = {}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
      <div className="text-center space-y-6 max-w-md">
        <AlertCircle className="mx-auto h-16 w-16 text-destructive" />
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Oops!</h1>
        <p className="text-xl text-muted-foreground">{message}</p>
        {onRetry && (
          <Button 
            onClick={onRetry} 
            size="lg" 
            className="mt-4"
          >
            Recargar
          </Button>
        )}
      </div>
    </div>
  )
}