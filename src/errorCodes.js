module.exports = {
    VALIDATION: {
        MISSING_NAME: {
            code: 'VALID_001',
            message: 'Gagal menambahkan buku. Mohon isi nama buku',
        },
        READPAGE_EXCEEDS_PAGECOUNT: {
            code: 'VALID_002',
            message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
        },
    },
    BOOK: {
        NOT_FOUND: {
            code: 'BOOK_001',
            message: 'Buku tidak ditemukan',
        },
        FAILED_UPDATE_NOT_FOUND: {
            code: 'BOOK_002',
            message: 'Gagal memperbarui buku. Id tidak ditemukan',
        },
        FAILED_DELETE_NOT_FOUND: {
            code: 'BOOK_003',
            message: 'Buku gagal dihapus. Id tidak ditemukan',
        },
    },
};