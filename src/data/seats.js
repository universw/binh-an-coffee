export const seats = [
  { id: '5', label: '5', group: 'Bàn' },
  { id: '6', label: '6', group: 'Bàn' },
  { id: 'cua-kinh', label: 'Cửa Kính', group: 'Khu cửa' },
  { id: 'sofa-nau', label: 'Sofa Nâu', group: 'Sofa' },
  { id: 'sofa-mau', label: 'Sofa Màu', group: 'Sofa' },
  { id: 'cua-so-1', label: 'Cửa Sổ 1', group: 'Cửa sổ' },
  { id: 'cua-so-2', label: 'Cửa Sổ 2', group: 'Cửa sổ' },
  { id: '13', label: '13', group: 'Bàn' },
  { id: '14', label: '14', group: 'Bàn' },
  { id: '15', label: '15', group: 'Bàn' },
  { id: '16', label: '16', group: 'Bàn' },
  { id: '17', label: '17', group: 'Bàn' },
  { id: '18', label: '18', group: 'Bàn' },
  { id: 'lau-19', label: 'Lầu 19', group: 'Lầu' },
  { id: 'lau-20', label: 'lầu 20', group: 'Lầu' },
  { id: 'lau-21', label: 'lầu 21', group: 'Lầu' },
  { id: 'lau-22', label: 'lầu 22', group: 'Lầu' },
  { id: 'ban-dai', label: 'Bàn Dài', group: 'Bàn' }
]

export function findSeat(id) {
  return seats.find(seat => seat.id === id)
}

export function orderUrlForSeat(seatId) {
  return `/order?seat=${encodeURIComponent(seatId)}`
}
