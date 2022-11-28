import { NextPage } from 'next'
import { PropsWithChildren } from 'react'

export type TypeRoles = {
	isOnlyForAdmin?: boolean
	isOnlyForUser?: boolean
}

export type NextPageAuth<P = {}> = NextPage<P> & TypeRoles

export type TypeComponentAuthFields = {
	Component: TypeRoles
} & PropsWithChildren
