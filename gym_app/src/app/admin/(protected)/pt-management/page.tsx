"use client"

import { useEffect, useState } from "react"
import { adminService } from "@/src/services/admin.services"
import SinglePTCard from "@/src/components/admin_page_component/SinglePTCard"
import SearchBar from "@/src/components/reusable_components/SearchBar"

interface PT {
    id: number
    firstName: string
    lastName: string
    email: string
    isEnabled: boolean
}

export default function PTManagementPage() {
    const [pts, setPts] = useState<PT[]>([])
    const [filteredPts, setFilteredPts] = useState<PT[]>([])
    const [searchQuery, setSearchQuery] = useState("")
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchPTs = async () => {
            try {
                const data = await adminService.getPTs()
                console.log("Dati ricevuti dal servizio:", data)

                const formattedPTs = data.map(pt => ({
                    id: pt.id,
                    firstName: pt.firstName,
                    lastName: pt.lastName,
                    email: pt.email,
                    isEnabled: pt.isEnabled
                })).sort((a, b) => a.lastName.localeCompare(b.lastName))

                console.log("PT formattati:", formattedPTs)
                setPts(formattedPTs)
                setFilteredPts(formattedPTs)
            } catch (error) {
                console.error("Errore nel recupero dei PT:", error)
            } finally {
                setIsLoading(false)
            }
        }

        fetchPTs()
    }, [])

    useEffect(() => {
        const filtered = pts.filter(pt =>
            pt.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            pt.lastName.toLowerCase().includes(searchQuery.toLowerCase())
        )
        setFilteredPts(filtered)
    }, [searchQuery, pts])

    const handleStatusChange = async (id: string, isEnabled: boolean) => {
        try {
            const result = await adminService.togglePTStatus(parseInt(id), { isEnabled })
            if (result?.success) {
                setPts(prevPts =>
                    prevPts.map(pt =>
                        pt.id.toString() === id
                            ? { ...pt, isEnabled }
                            : pt
                    )
                )
            }
        } catch (error) {
            console.error("Errore nel cambio di stato del PT:", error)
        }
    }

    if (isLoading) {
        return <div className="flex justify-center items-center min-h-screen">Caricamento...</div>
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-6">
                <SearchBar
                    placeholder="Cerca Personal Trainer per nome..."
                    value={searchQuery}
                    onChange={setSearchQuery}
                />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPts.map((pt) => (
                    <SinglePTCard
                        key={pt.id}
                        id={pt.id.toString()}
                        firstName={pt.firstName}
                        lastName={pt.lastName}
                        email={pt.email}
                        isEnabled={pt.isEnabled}
                        onStatusChange={handleStatusChange}
                    />
                ))}
            </div>
        </div>
    )
}
