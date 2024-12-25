package com.iset.drblythe.exception;

import java.time.LocalDateTime;

public record CustomError (LocalDateTime timestamp, String message) {
}
