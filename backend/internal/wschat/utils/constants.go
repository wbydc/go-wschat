package utils

type ContextKey string

const ContextUserIdKey ContextKey = "userId"

const UUIDRegEx string = "{id:[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-4[a-fA-F0-9]{3}-[8|9|aA|bB][a-fA-F0-9]{3}-[a-fA-F0-9]{12}$}"
