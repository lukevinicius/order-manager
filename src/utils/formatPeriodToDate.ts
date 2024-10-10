import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'

dayjs.locale('pt-br')

interface IResponse {
  startDate: Date
  endDate: Date
}

export function formatPeriodToDate(period: string): IResponse {
  let startDate: Date
  let endDate: Date

  switch (period) {
    case 'today':
      startDate = dayjs().startOf('day').toDate()
      endDate = dayjs().toDate()
      break
    case 'yesterday':
      startDate = dayjs().startOf('day').subtract(1, 'day').toDate()
      endDate = dayjs().startOf('day').toDate()
      break
    case 'this-week':
      startDate = dayjs().startOf('week').toDate()
      endDate = dayjs().toDate()
      break
    case 'last-week':
      startDate = dayjs().startOf('week').subtract(1, 'week').toDate()
      endDate = dayjs().startOf('week').subtract(1, 'second').toDate()
      break
    case 'last-7-days':
      startDate = dayjs().startOf('day').subtract(7, 'day').toDate()
      endDate = dayjs().toDate()
      break
    case 'last-15-days':
      startDate = dayjs().startOf('day').subtract(15, 'day').toDate()
      endDate = dayjs().toDate()
      break
    case 'last-30-days':
      startDate = dayjs().startOf('day').subtract(30, 'day').toDate()
      endDate = dayjs().toDate()
      break
    case 'this-month':
      startDate = dayjs().startOf('month').toDate()
      endDate = dayjs().toDate()
      break
    case 'last-month':
      startDate = dayjs().startOf('month').subtract(1, 'month').toDate()
      endDate = dayjs().startOf('month').subtract(1, 'second').toDate()
      break
    case 'last-3-months':
      startDate = dayjs().startOf('month').subtract(3, 'month').toDate()
      endDate = dayjs().toDate()
      break
    // default:
    //   throw new AppError('Invalid period')
    default:
      throw new Error('Invalid period')
  }

  const response = {
    startDate,
    endDate,
  }

  return response
}
