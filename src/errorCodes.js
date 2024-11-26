module.exports = {
    VALIDATION: {
        MISSING_NAME: {
            message: 'Gagal menambahkan buku. Mohon isi nama buku',
        },
        READPAGE_EXCEEDS_PAGECOUNT: {
            message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
        },
        READPAGE_CANNOT_BE_GREATER: {
            message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
        },
    },
    BOOK: {
        FAILED_ADD: {
            message: 'Buku gagal ditambahkan',
        },
        NOT_FOUND: {
            message: 'Buku tidak ditemukan',
        },
        FAILED_UPDATE_NOT_FOUND: {
            message: 'Gagal memperbarui buku. Mohon isi nama buku',
        },
        FAILED_UPDATE_ID_NOT_FOUND: {
            message: 'Gagal memperbarui buku. Id tidak ditemukan',
        },
        FAILED_DELETE_NOT_FOUND: {
            message: 'Buku gagal dihapus. Id tidak ditemukan',
        },
    },
};