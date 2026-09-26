export const STATUS_CONFIG = {
  received: { label: 'รับเข้า', color: 'received', icon: 'PackageCheck' },
  sorting: { label: 'กำลังคัดแยก', color: 'sorting', icon: 'ArrowLeftRight' },
  stored: { label: 'จัดเก็บแล้ว', color: 'stored', icon: 'Warehouse' },
  ready_to_ship: { label: 'พร้อมส่ง', color: 'ready', icon: 'Truck' },
  shipped: { label: 'นำออกแล้ว', color: 'shipped', icon: 'CheckCircle' },
}

export const PRIORITY_CONFIG = {
  normal: { label: 'ปกติ', color: 'gray' },
  express: { label: 'ด่วน', color: 'orange' },
  urgent: { label: 'ด่วนมาก', color: 'red' },
}

export function createParcel(data) {
  const defaults = {
    status: 'received',
    location: { zone: 'A', row: 1, shelf: 1, slot: 1 },
    weight: 1.0,
    dimensions: '30x20x15',
    category: 'อื่นๆ',
    priority: 'normal',
    receivedAt: new Date().toISOString()
  };
  const trackingNumber = `TH-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`;
  return { trackingNumber, ...defaults, ...data };
}

export const parcels = [
  {
    id: 'P001',
    trackingNumber: 'TH-2026-10001',
    senderName: 'สมชาย ใจดี',
    senderAddress: '123 ถ.สุขุมวิท แขวงคลองเตย เขตคลองเตย กรุงเทพฯ 10110',
    recipientName: 'วิภา สุขสันต์',
    recipientAddress: '456 ถ.เชียงใหม่-ลำพูน ต.วัดเกต อ.เมือง จ.เชียงใหม่ 50000',
    status: 'received',
    location: { zone: 'A', row: 1, shelf: 1, slot: 1 },
    weight: 2.5,
    dimensions: '30x20x15',
    category: 'อิเล็กทรอนิกส์',
    priority: 'normal',
    receivedAt: '2026-08-27T08:30:00',
    timeline: [
      { id: 't1', action: 'รับพัสดุเข้าคลัง', status: 'received', location: 'จุดรับสินค้า', timestamp: '2026-08-27T08:30:00', operator: 'สมชาย ใจดี' }
    ]
  },
  {
    id: 'P002',
    trackingNumber: 'TH-2026-10002',
    senderName: 'ธนา วงศ์ประเสริฐ',
    senderAddress: '789 ถ.พหลโยธิน แขวงสามเสนใน เขตพญาไท กรุงเทพฯ 10400',
    recipientName: 'มาลี ดอกไม้',
    recipientAddress: '321 ถ.มิตรภาพ ต.ในเมือง อ.เมือง จ.นครราชสีมา 30000',
    status: 'received',
    location: { zone: 'A', row: 1, shelf: 2, slot: 1 },
    weight: 1.2,
    dimensions: '20x15x10',
    category: 'เสื้อผ้า',
    priority: 'express',
    receivedAt: '2026-08-27T09:00:00',
    timeline: [
      { id: 't1', action: 'รับพัสดุเข้าคลัง', status: 'received', location: 'จุดรับสินค้า', timestamp: '2026-08-27T09:00:00', operator: 'อรุณ แสงเช้า' }
    ]
  },
  {
    id: 'P003',
    trackingNumber: 'TH-2026-10003',
    senderName: 'พรทิพย์ แก้วมณี',
    senderAddress: '55 ซ.ลาดพร้าว 15 แขวงจอมพล เขตจตุจักร กรุงเทพฯ 10900',
    recipientName: 'สุภาพร ทองสุข',
    recipientAddress: '88 ถ.เพชรเกษม ต.หาดใหญ่ อ.หาดใหญ่ จ.สงขลา 90110',
    status: 'received',
    location: { zone: 'A', row: 2, shelf: 1, slot: 1 },
    weight: 5.0,
    dimensions: '50x40x30',
    category: 'เครื่องสำอาง',
    priority: 'normal',
    receivedAt: '2026-08-27T09:15:00',
    timeline: [
      { id: 't1', action: 'รับพัสดุเข้าคลัง', status: 'received', location: 'จุดรับสินค้า', timestamp: '2026-08-27T09:15:00', operator: 'สมชาย ใจดี' }
    ]
  },
  {
    id: 'P004',
    trackingNumber: 'TH-2026-10004',
    senderName: 'วิชัย ศรีสุข',
    senderAddress: '22 ถ.รัชดาภิเษก แขวงดินแดง เขตดินแดง กรุงเทพฯ 10400',
    recipientName: 'นภา เมฆสวย',
    recipientAddress: '199 ถ.สุรนารายณ์ ต.ในเมือง อ.เมือง จ.นครราชสีมา 30000',
    status: 'received',
    location: { zone: 'B', row: 1, shelf: 1, slot: 1 },
    weight: 0.8,
    dimensions: '15x10x5',
    category: 'เอกสาร',
    priority: 'urgent',
    receivedAt: '2026-08-27T09:30:00',
    timeline: [
      { id: 't1', action: 'รับพัสดุเข้าคลัง', status: 'received', location: 'จุดรับสินค้า', timestamp: '2026-08-27T09:30:00', operator: 'อรุณ แสงเช้า' }
    ]
  },
  {
    id: 'P005',
    trackingNumber: 'TH-2026-10005',
    senderName: 'กมล สุขใจ',
    senderAddress: '100 ถ.งามวงศ์วาน แขวงลาดยาว เขตจตุจักร กรุงเทพฯ 10900',
    recipientName: 'ปิยะ เจริญศรี',
    recipientAddress: '77 ถ.ศรีจันทร์ ต.ในเมือง อ.เมือง จ.ขอนแก่น 40000',
    status: 'received',
    location: { zone: 'B', row: 1, shelf: 2, slot: 1 },
    weight: 3.5,
    dimensions: '40x30x20',
    category: 'ของใช้ทั่วไป',
    priority: 'normal',
    receivedAt: '2026-08-27T10:00:00',
    timeline: [
      { id: 't1', action: 'รับพัสดุเข้าคลัง', status: 'received', location: 'จุดรับสินค้า', timestamp: '2026-08-27T10:00:00', operator: 'สมชาย ใจดี' }
    ]
  },
  {
    id: 'P006',
    trackingNumber: 'TH-2026-10006',
    senderName: 'อรุณี วิไลพร',
    senderAddress: '45 ซ.สาทร 11 แขวงยานนาวา เขตสาทร กรุงเทพฯ 10120',
    recipientName: 'จิตรา ลำเจียก',
    recipientAddress: '234 ถ.พระราม 2 ต.แสมดำ อ.บางขุนเทียน กรุงเทพฯ 10150',
    status: 'sorting',
    location: { zone: 'A', row: 2, shelf: 2, slot: 1 },
    weight: 1.8,
    dimensions: '25x20x15',
    category: 'อิเล็กทรอนิกส์',
    priority: 'express',
    receivedAt: '2026-08-26T14:00:00',
    timeline: [
      { id: 't1', action: 'รับพัสดุเข้าคลัง', status: 'received', location: 'จุดรับสินค้า', timestamp: '2026-08-26T14:00:00', operator: 'สมชาย ใจดี' },
      { id: 't2', action: 'เริ่มคัดแยกพัสดุ', status: 'sorting', location: 'โซนคัดแยก', timestamp: '2026-08-26T15:30:00', operator: 'อรุณ แสงเช้า' }
    ]
  },
  {
    id: 'P007',
    trackingNumber: 'TH-2026-10007',
    senderName: 'ประสิทธิ์ บุญมา',
    senderAddress: '88 ถ.ศรีนครินทร์ แขวงสวนหลวง เขตสวนหลวง กรุงเทพฯ 10250',
    recipientName: 'วรรณา ใสสะอาด',
    recipientAddress: '56 ถ.ราชดำเนิน ต.ในเมือง อ.เมือง จ.เชียงราย 57000',
    status: 'sorting',
    location: { zone: 'A', row: 3, shelf: 1, slot: 1 },
    weight: 4.2,
    dimensions: '45x35x25',
    category: 'เครื่องสำอาง',
    priority: 'normal',
    receivedAt: '2026-08-26T13:00:00',
    timeline: [
      { id: 't1', action: 'รับพัสดุเข้าคลัง', status: 'received', location: 'จุดรับสินค้า', timestamp: '2026-08-26T13:00:00', operator: 'อรุณ แสงเช้า' },
      { id: 't2', action: 'เริ่มคัดแยกพัสดุ', status: 'sorting', location: 'โซนคัดแยก', timestamp: '2026-08-26T14:30:00', operator: 'สมชาย ใจดี' }
    ]
  },
  {
    id: 'P008',
    trackingNumber: 'TH-2026-10008',
    senderName: 'สุรีย์ พิมพ์ทอง',
    senderAddress: '33 ซ.อ่อนนุช 17 แขวงสวนหลวง เขตสวนหลวง กรุงเทพฯ 10250',
    recipientName: 'ธีรศักดิ์ มั่นคง',
    recipientAddress: '111 ถ.สิรินธร ต.ท่าเรือ อ.เมือง จ.ภูเก็ต 83000',
    status: 'sorting',
    location: { zone: 'B', row: 2, shelf: 1, slot: 1 },
    weight: 6.0,
    dimensions: '60x40x35',
    category: 'ของใช้ทั่วไป',
    priority: 'normal',
    receivedAt: '2026-08-26T10:00:00',
    timeline: [
      { id: 't1', action: 'รับพัสดุเข้าคลัง', status: 'received', location: 'จุดรับสินค้า', timestamp: '2026-08-26T10:00:00', operator: 'สมชาย ใจดี' },
      { id: 't2', action: 'เริ่มคัดแยกพัสดุ', status: 'sorting', location: 'โซนคัดแยก', timestamp: '2026-08-26T11:00:00', operator: 'อรุณ แสงเช้า' }
    ]
  },
  {
    id: 'P009',
    trackingNumber: 'TH-2026-10009',
    senderName: 'เกษม ร่มเย็น',
    senderAddress: '67 ถ.บางนา-ตราด แขวงบางนา เขตบางนา กรุงเทพฯ 10260',
    recipientName: 'อำพร รักษ์ดี',
    recipientAddress: '89 ถ.นิมมานเหมินท์ ต.สุเทพ อ.เมือง จ.เชียงใหม่ 50200',
    status: 'sorting',
    location: { zone: 'C', row: 1, shelf: 1, slot: 1 },
    weight: 2.0,
    dimensions: '30x25x20',
    category: 'เสื้อผ้า',
    priority: 'express',
    receivedAt: '2026-08-26T08:00:00',
    timeline: [
      { id: 't1', action: 'รับพัสดุเข้าคลัง', status: 'received', location: 'จุดรับสินค้า', timestamp: '2026-08-26T08:00:00', operator: 'อรุณ แสงเช้า' },
      { id: 't2', action: 'เริ่มคัดแยกพัสดุ', status: 'sorting', location: 'โซนคัดแยก', timestamp: '2026-08-26T09:00:00', operator: 'สมชาย ใจดี' }
    ]
  },
  {
    id: 'P010',
    trackingNumber: 'TH-2026-10010',
    senderName: 'รัตนา ทองคำ',
    senderAddress: '12 ถ.วิภาวดีรังสิต แขวงจอมพล เขตจตุจักร กรุงเทพฯ 10900',
    recipientName: 'ชัยวัฒน์ สร้างสรรค์',
    recipientAddress: '200 ถ.มิตรภาพ ต.ในเมือง อ.เมือง จ.อุดรธานี 41000',
    status: 'sorting',
    location: { zone: 'C', row: 1, shelf: 2, slot: 1 },
    weight: 1.5,
    dimensions: '20x15x12',
    category: 'อิเล็กทรอนิกส์',
    priority: 'urgent',
    receivedAt: '2026-08-26T07:30:00',
    timeline: [
      { id: 't1', action: 'รับพัสดุเข้าคลัง', status: 'received', location: 'จุดรับสินค้า', timestamp: '2026-08-26T07:30:00', operator: 'สมชาย ใจดี' },
      { id: 't2', action: 'เริ่มคัดแยกพัสดุ', status: 'sorting', location: 'โซนคัดแยก', timestamp: '2026-08-26T08:30:00', operator: 'อรุณ แสงเช้า' }
    ]
  },
  {
    id: 'P011',
    trackingNumber: 'TH-2026-10011',
    senderName: 'บุญส่ง ทำดี',
    senderAddress: '150 ถ.ประชาชื่น แขวงบางซื่อ เขตบางซื่อ กรุงเทพฯ 10800',
    recipientName: 'ดวงใจ สว่าง',
    recipientAddress: '44 ถ.ช้างคลาน ต.ช้างคลาน อ.เมือง จ.เชียงใหม่ 50100',
    status: 'stored',
    location: { zone: 'A', row: 3, shelf: 2, slot: 1 },
    weight: 3.0,
    dimensions: '35x25x20',
    category: 'อิเล็กทรอนิกส์',
    priority: 'normal',
    receivedAt: '2026-08-25T09:00:00',
    timeline: [
      { id: 't1', action: 'รับพัสดุเข้าคลัง', status: 'received', location: 'จุดรับสินค้า', timestamp: '2026-08-25T09:00:00', operator: 'สมชาย ใจดี' },
      { id: 't2', action: 'เริ่มคัดแยกพัสดุ', status: 'sorting', location: 'โซนคัดแยก', timestamp: '2026-08-25T10:30:00', operator: 'อรุณ แสงเช้า' },
      { id: 't3', action: 'จัดเก็บเข้าชั้น', status: 'stored', location: 'โซน A แถว 3 ชั้น 2', timestamp: '2026-08-25T13:00:00', operator: 'สมชาย ใจดี' }
    ]
  },
  {
    id: 'P012',
    trackingNumber: 'TH-2026-10012',
    senderName: 'นิรันดร์ ยิ้มแย้ม',
    senderAddress: '78 ซ.เอกมัย แขวงคลองตันเหนือ เขตวัฒนา กรุงเทพฯ 10110',
    recipientName: 'สุดา แจ่มใส',
    recipientAddress: '333 ถ.เจริญกรุง แขวงสี่พระยา เขตบางรัก กรุงเทพฯ 10500',
    status: 'stored',
    location: { zone: 'A', row: 4, shelf: 1, slot: 1 },
    weight: 7.5,
    dimensions: '70x50x40',
    category: 'เครื่องสำอาง',
    priority: 'normal',
    receivedAt: '2026-08-25T08:00:00',
    timeline: [
      { id: 't1', action: 'รับพัสดุเข้าคลัง', status: 'received', location: 'จุดรับสินค้า', timestamp: '2026-08-25T08:00:00', operator: 'อรุณ แสงเช้า' },
      { id: 't2', action: 'เริ่มคัดแยกพัสดุ', status: 'sorting', location: 'โซนคัดแยก', timestamp: '2026-08-25T09:30:00', operator: 'สมชาย ใจดี' },
      { id: 't3', action: 'จัดเก็บเข้าชั้น', status: 'stored', location: 'โซน A แถว 4 ชั้น 1', timestamp: '2026-08-25T12:00:00', operator: 'อรุณ แสงเช้า' }
    ]
  },
  {
    id: 'P013',
    trackingNumber: 'TH-2026-10013',
    senderName: 'อุดม พัฒนา',
    senderAddress: '90 ถ.แจ้งวัฒนะ แขวงทุ่งสองห้อง เขตหลักสี่ กรุงเทพฯ 10210',
    recipientName: 'พัชรินทร์ มีสุข',
    recipientAddress: '55 ถ.พัทยากลาง ต.นาเกลือ อ.บางละมุง จ.ชลบุรี 20150',
    status: 'stored',
    location: { zone: 'B', row: 2, shelf: 2, slot: 1 },
    weight: 0.5,
    dimensions: '15x10x8',
    category: 'เอกสาร',
    priority: 'express',
    receivedAt: '2026-08-24T14:00:00',
    timeline: [
      { id: 't1', action: 'รับพัสดุเข้าคลัง', status: 'received', location: 'จุดรับสินค้า', timestamp: '2026-08-24T14:00:00', operator: 'สมชาย ใจดี' },
      { id: 't2', action: 'เริ่มคัดแยกพัสดุ', status: 'sorting', location: 'โซนคัดแยก', timestamp: '2026-08-24T15:00:00', operator: 'อรุณ แสงเช้า' },
      { id: 't3', action: 'จัดเก็บเข้าชั้น', status: 'stored', location: 'โซน B แถว 2 ชั้น 2', timestamp: '2026-08-24T17:00:00', operator: 'สมชาย ใจดี' }
    ]
  },
  {
    id: 'P014',
    trackingNumber: 'TH-2026-10014',
    senderName: 'จิราภรณ์ สดใส',
    senderAddress: '40 ถ.รามคำแหง แขวงหัวหมาก เขตบางกะปิ กรุงเทพฯ 10240',
    recipientName: 'สมศักดิ์ วิริยะ',
    recipientAddress: '122 ถ.สุขุมวิท ต.ศรีราชา อ.ศรีราชา จ.ชลบุรี 20110',
    status: 'stored',
    location: { zone: 'B', row: 3, shelf: 1, slot: 1 },
    weight: 2.8,
    dimensions: '30x20x18',
    category: 'เสื้อผ้า',
    priority: 'normal',
    receivedAt: '2026-08-24T10:00:00',
    timeline: [
      { id: 't1', action: 'รับพัสดุเข้าคลัง', status: 'received', location: 'จุดรับสินค้า', timestamp: '2026-08-24T10:00:00', operator: 'อรุณ แสงเช้า' },
      { id: 't2', action: 'เริ่มคัดแยกพัสดุ', status: 'sorting', location: 'โซนคัดแยก', timestamp: '2026-08-24T11:30:00', operator: 'สมชาย ใจดี' },
      { id: 't3', action: 'จัดเก็บเข้าชั้น', status: 'stored', location: 'โซน B แถว 3 ชั้น 1', timestamp: '2026-08-24T14:00:00', operator: 'อรุณ แสงเช้า' }
    ]
  },
  {
    id: 'P015',
    trackingNumber: 'TH-2026-10015',
    senderName: 'กาญจนา สมบูรณ์',
    senderAddress: '200 ถ.พระราม 9 แขวงห้วยขวาง เขตห้วยขวาง กรุงเทพฯ 10310',
    recipientName: 'วีระ ก้าวหน้า',
    recipientAddress: '88 ถ.เทพารักษ์ ต.บางเมือง อ.เมือง จ.สมุทรปราการ 10270',
    status: 'stored',
    location: { zone: 'C', row: 2, shelf: 1, slot: 1 },
    weight: 10.0,
    dimensions: '80x60x50',
    category: 'ของใช้ทั่วไป',
    priority: 'normal',
    receivedAt: '2026-08-24T08:00:00',
    timeline: [
      { id: 't1', action: 'รับพัสดุเข้าคลัง', status: 'received', location: 'จุดรับสินค้า', timestamp: '2026-08-24T08:00:00', operator: 'สมชาย ใจดี' },
      { id: 't2', action: 'เริ่มคัดแยกพัสดุ', status: 'sorting', location: 'โซนคัดแยก', timestamp: '2026-08-24T09:30:00', operator: 'อรุณ แสงเช้า' },
      { id: 't3', action: 'จัดเก็บเข้าชั้น', status: 'stored', location: 'โซน C แถว 2 ชั้น 1', timestamp: '2026-08-24T12:00:00', operator: 'สมชาย ใจดี' }
    ]
  },
  {
    id: 'P016',
    trackingNumber: 'TH-2026-10016',
    senderName: 'ชาญชัย เก่งกล้า',
    senderAddress: '15 ซ.ทองหล่อ แขวงคลองตันเหนือ เขตวัฒนา กรุงเทพฯ 10110',
    recipientName: 'กรรณิกา ดอกรัก',
    recipientAddress: '170 ถ.รามอินทรา แขวงอนุสาวรีย์ เขตบางเขน กรุงเทพฯ 10220',
    status: 'stored',
    location: { zone: 'C', row: 2, shelf: 2, slot: 1 },
    weight: 1.0,
    dimensions: '18x15x10',
    category: 'อิเล็กทรอนิกส์',
    priority: 'express',
    receivedAt: '2026-08-23T15:00:00',
    timeline: [
      { id: 't1', action: 'รับพัสดุเข้าคลัง', status: 'received', location: 'จุดรับสินค้า', timestamp: '2026-08-23T15:00:00', operator: 'อรุณ แสงเช้า' },
      { id: 't2', action: 'เริ่มคัดแยกพัสดุ', status: 'sorting', location: 'โซนคัดแยก', timestamp: '2026-08-23T16:00:00', operator: 'สมชาย ใจดี' },
      { id: 't3', action: 'จัดเก็บเข้าชั้น', status: 'stored', location: 'โซน C แถว 2 ชั้น 2', timestamp: '2026-08-23T18:00:00', operator: 'อรุณ แสงเช้า' }
    ]
  },
  {
    id: 'P017',
    trackingNumber: 'TH-2026-10017',
    senderName: 'ณัฐพงษ์ แข็งแรง',
    senderAddress: '300 ถ.ติวานนท์ ต.บ้านใหม่ อ.เมือง จ.ปทุมธานี 12000',
    recipientName: 'อัจฉรา น่ารัก',
    recipientAddress: '60 ถ.พหลโยธิน ต.คลองหนึ่ง อ.คลองหลวง จ.ปทุมธานี 12120',
    status: 'stored',
    location: { zone: 'D', row: 1, shelf: 1, slot: 1 },
    weight: 15.0,
    dimensions: '100x70x60',
    category: 'เครื่องสำอาง',
    priority: 'normal',
    receivedAt: '2026-08-23T09:00:00',
    timeline: [
      { id: 't1', action: 'รับพัสดุเข้าคลัง', status: 'received', location: 'จุดรับสินค้า', timestamp: '2026-08-23T09:00:00', operator: 'สมชาย ใจดี' },
      { id: 't2', action: 'เริ่มคัดแยกพัสดุ', status: 'sorting', location: 'โซนคัดแยก', timestamp: '2026-08-23T10:30:00', operator: 'อรุณ แสงเช้า' },
      { id: 't3', action: 'จัดเก็บเข้าชั้น', status: 'stored', location: 'โซน D แถว 1 ชั้น 1', timestamp: '2026-08-23T13:00:00', operator: 'สมชาย ใจดี' }
    ]
  },
  {
    id: 'P018',
    trackingNumber: 'TH-2026-10018',
    senderName: 'ปวีณา จันทร์เพ็ญ',
    senderAddress: '25 ถ.นวมินทร์ แขวงคลองจั่น เขตบางกะปิ กรุงเทพฯ 10240',
    recipientName: 'เสรี อิสระ',
    recipientAddress: '400 ถ.เพชรบุรีตัดใหม่ แขวงมักกะสัน เขตราชเทวี กรุงเทพฯ 10400',
    status: 'ready_to_ship',
    location: { zone: 'D', row: 1, shelf: 2, slot: 1 },
    weight: 2.2,
    dimensions: '28x22x16',
    category: 'อิเล็กทรอนิกส์',
    priority: 'express',
    receivedAt: '2026-08-22T09:00:00',
    timeline: [
      { id: 't1', action: 'รับพัสดุเข้าคลัง', status: 'received', location: 'จุดรับสินค้า', timestamp: '2026-08-22T09:00:00', operator: 'อรุณ แสงเช้า' },
      { id: 't2', action: 'เริ่มคัดแยกพัสดุ', status: 'sorting', location: 'โซนคัดแยก', timestamp: '2026-08-22T10:00:00', operator: 'สมชาย ใจดี' },
      { id: 't3', action: 'จัดเก็บเข้าชั้น', status: 'stored', location: 'โซน D แถว 1 ชั้น 2', timestamp: '2026-08-22T13:00:00', operator: 'อรุณ แสงเช้า' },
      { id: 't4', action: 'หยิบสินค้าและเตรียมส่ง', status: 'ready_to_ship', location: 'จุดจัดส่ง', timestamp: '2026-08-26T08:00:00', operator: 'สมชาย ใจดี' }
    ]
  },
  {
    id: 'P019',
    trackingNumber: 'TH-2026-10019',
    senderName: 'ลาวัลย์ หอมหวาน',
    senderAddress: '180 ถ.สีลม แขวงสุริยวงศ์ เขตบางรัก กรุงเทพฯ 10500',
    recipientName: 'ฉัตรชัย ยอดเยี่ยม',
    recipientAddress: '35 ถ.ราชวิถี แขวงทุ่งพญาไท เขตราชเทวี กรุงเทพฯ 10400',
    status: 'ready_to_ship',
    location: { zone: 'D', row: 2, shelf: 1, slot: 1 },
    weight: 4.5,
    dimensions: '50x35x25',
    category: 'เสื้อผ้า',
    priority: 'normal',
    receivedAt: '2026-08-21T10:00:00',
    timeline: [
      { id: 't1', action: 'รับพัสดุเข้าคลัง', status: 'received', location: 'จุดรับสินค้า', timestamp: '2026-08-21T10:00:00', operator: 'สมชาย ใจดี' },
      { id: 't2', action: 'เริ่มคัดแยกพัสดุ', status: 'sorting', location: 'โซนคัดแยก', timestamp: '2026-08-21T11:30:00', operator: 'อรุณ แสงเช้า' },
      { id: 't3', action: 'จัดเก็บเข้าชั้น', status: 'stored', location: 'โซน D แถว 2 ชั้น 1', timestamp: '2026-08-21T14:00:00', operator: 'สมชาย ใจดี' },
      { id: 't4', action: 'หยิบสินค้าและเตรียมส่ง', status: 'ready_to_ship', location: 'จุดจัดส่ง', timestamp: '2026-08-26T09:00:00', operator: 'อรุณ แสงเช้า' }
    ]
  },
  {
    id: 'P020',
    trackingNumber: 'TH-2026-10020',
    senderName: 'ศิริพร เรืองศรี',
    senderAddress: '99 ถ.ลาดกระบัง แขวงลาดกระบัง เขตลาดกระบัง กรุงเทพฯ 10520',
    recipientName: 'ภาณุ เจริญรุ่ง',
    recipientAddress: '250 ถ.ประชาอุทิศ แขวงราษฎร์บูรณะ เขตราษฎร์บูรณะ กรุงเทพฯ 10140',
    status: 'ready_to_ship',
    location: { zone: 'D', row: 2, shelf: 2, slot: 1 },
    weight: 0.3,
    dimensions: '10x8x5',
    category: 'เอกสาร',
    priority: 'urgent',
    receivedAt: '2026-08-22T14:00:00',
    timeline: [
      { id: 't1', action: 'รับพัสดุเข้าคลัง', status: 'received', location: 'จุดรับสินค้า', timestamp: '2026-08-22T14:00:00', operator: 'อรุณ แสงเช้า' },
      { id: 't2', action: 'เริ่มคัดแยกพัสดุ', status: 'sorting', location: 'โซนคัดแยก', timestamp: '2026-08-22T15:00:00', operator: 'สมชาย ใจดี' },
      { id: 't3', action: 'จัดเก็บเข้าชั้น', status: 'stored', location: 'โซน D แถว 2 ชั้น 2', timestamp: '2026-08-22T17:00:00', operator: 'อรุณ แสงเช้า' },
      { id: 't4', action: 'หยิบสินค้าและเตรียมส่ง', status: 'ready_to_ship', location: 'จุดจัดส่ง', timestamp: '2026-08-26T10:00:00', operator: 'สมชาย ใจดี' }
    ]
  },
  {
    id: 'P021',
    trackingNumber: 'TH-2026-10021',
    senderName: 'ทวี มีโชค',
    senderAddress: '77 ถ.ประดิษฐ์มนูธรรม แขวงลาดพร้าว เขตลาดพร้าว กรุงเทพฯ 10230',
    recipientName: 'อรทัย ดีงาม',
    recipientAddress: '145 ถ.ห้วยแก้ว ต.สุเทพ อ.เมือง จ.เชียงใหม่ 50200',
    status: 'ready_to_ship',
    location: { zone: 'D', row: 3, shelf: 1, slot: 1 },
    weight: 3.3,
    dimensions: '35x28x22',
    category: 'ของใช้ทั่วไป',
    priority: 'normal',
    receivedAt: '2026-08-20T11:00:00',
    timeline: [
      { id: 't1', action: 'รับพัสดุเข้าคลัง', status: 'received', location: 'จุดรับสินค้า', timestamp: '2026-08-20T11:00:00', operator: 'สมชาย ใจดี' },
      { id: 't2', action: 'เริ่มคัดแยกพัสดุ', status: 'sorting', location: 'โซนคัดแยก', timestamp: '2026-08-20T12:30:00', operator: 'อรุณ แสงเช้า' },
      { id: 't3', action: 'จัดเก็บเข้าชั้น', status: 'stored', location: 'โซน D แถว 3 ชั้น 1', timestamp: '2026-08-20T15:00:00', operator: 'สมชาย ใจดี' },
      { id: 't4', action: 'หยิบสินค้าและเตรียมส่ง', status: 'ready_to_ship', location: 'จุดจัดส่ง', timestamp: '2026-08-26T11:00:00', operator: 'อรุณ แสงเช้า' }
    ]
  },
  {
    id: 'P022',
    trackingNumber: 'TH-2026-10022',
    senderName: 'มนัส เดินดี',
    senderAddress: '60 ถ.จรัญสนิทวงศ์ แขวงบางอ้อ เขตบางพลัด กรุงเทพฯ 10700',
    recipientName: 'พิมพ์ลดา วิลาวัลย์',
    recipientAddress: '80 ถ.เจริญเมือง ต.วัดเกต อ.เมือง จ.เชียงใหม่ 50000',
    status: 'ready_to_ship',
    location: { zone: 'D', row: 3, shelf: 2, slot: 1 },
    weight: 1.7,
    dimensions: '22x18x12',
    category: 'เครื่องสำอาง',
    priority: 'express',
    receivedAt: '2026-08-21T08:00:00',
    timeline: [
      { id: 't1', action: 'รับพัสดุเข้าคลัง', status: 'received', location: 'จุดรับสินค้า', timestamp: '2026-08-21T08:00:00', operator: 'อรุณ แสงเช้า' },
      { id: 't2', action: 'เริ่มคัดแยกพัสดุ', status: 'sorting', location: 'โซนคัดแยก', timestamp: '2026-08-21T09:00:00', operator: 'สมชาย ใจดี' },
      { id: 't3', action: 'จัดเก็บเข้าชั้น', status: 'stored', location: 'โซน D แถว 3 ชั้น 2', timestamp: '2026-08-21T12:00:00', operator: 'อรุณ แสงเช้า' },
      { id: 't4', action: 'หยิบสินค้าและเตรียมส่ง', status: 'ready_to_ship', location: 'จุดจัดส่ง', timestamp: '2026-08-26T12:00:00', operator: 'สมชาย ใจดี' }
    ]
  },
  {
    id: 'P023',
    trackingNumber: 'TH-2026-10023',
    senderName: 'สมพร ภูมิใจ',
    senderAddress: '111 ถ.บรมราชชนนี แขวงศาลาธรรมสพน์ เขตทวีวัฒนา กรุงเทพฯ 10170',
    recipientName: 'ประทีป ส่องสว่าง',
    recipientAddress: '90 ถ.หน้าเมือง ต.ในเมือง อ.เมือง จ.ขอนแก่น 40000',
    status: 'shipped',
    location: null,
    weight: 5.5,
    dimensions: '55x40x30',
    category: 'อิเล็กทรอนิกส์',
    priority: 'express',
    receivedAt: '2026-08-19T09:00:00',
    timeline: [
      { id: 't1', action: 'รับพัสดุเข้าคลัง', status: 'received', location: 'จุดรับสินค้า', timestamp: '2026-08-19T09:00:00', operator: 'สมชาย ใจดี' },
      { id: 't2', action: 'เริ่มคัดแยกพัสดุ', status: 'sorting', location: 'โซนคัดแยก', timestamp: '2026-08-19T10:30:00', operator: 'อรุณ แสงเช้า' },
      { id: 't3', action: 'จัดเก็บเข้าชั้น', status: 'stored', location: 'โซน B แถว 4 ชั้น 1', timestamp: '2026-08-19T13:00:00', operator: 'สมชาย ใจดี' },
      { id: 't4', action: 'หยิบสินค้าและเตรียมส่ง', status: 'ready_to_ship', location: 'จุดจัดส่ง', timestamp: '2026-08-25T08:00:00', operator: 'อรุณ แสงเช้า' },
      { id: 't5', action: 'นำส่งออกจากคลัง', status: 'shipped', location: 'ท่าจัดส่ง', timestamp: '2026-08-25T14:00:00', operator: 'สมชาย ใจดี' }
    ]
  },
  {
    id: 'P024',
    trackingNumber: 'TH-2026-10024',
    senderName: 'เพ็ญศรี อุ่นใจ',
    senderAddress: '35 ถ.พุทธมณฑลสาย 2 แขวงศาลาธรรมสพน์ เขตทวีวัฒนา กรุงเทพฯ 10170',
    recipientName: 'กิตติศักดิ์ ทำนุ',
    recipientAddress: '220 ถ.สุรินทร์-ปราสาท ต.ในเมือง อ.เมือง จ.สุรินทร์ 32000',
    status: 'shipped',
    location: null,
    weight: 8.0,
    dimensions: '75x55x45',
    category: 'ของใช้ทั่วไป',
    priority: 'normal',
    receivedAt: '2026-08-18T10:00:00',
    timeline: [
      { id: 't1', action: 'รับพัสดุเข้าคลัง', status: 'received', location: 'จุดรับสินค้า', timestamp: '2026-08-18T10:00:00', operator: 'อรุณ แสงเช้า' },
      { id: 't2', action: 'เริ่มคัดแยกพัสดุ', status: 'sorting', location: 'โซนคัดแยก', timestamp: '2026-08-18T11:30:00', operator: 'สมชาย ใจดี' },
      { id: 't3', action: 'จัดเก็บเข้าชั้น', status: 'stored', location: 'โซน C แถว 3 ชั้น 1', timestamp: '2026-08-18T14:00:00', operator: 'อรุณ แสงเช้า' },
      { id: 't4', action: 'หยิบสินค้าและเตรียมส่ง', status: 'ready_to_ship', location: 'จุดจัดส่ง', timestamp: '2026-08-24T09:00:00', operator: 'สมชาย ใจดี' },
      { id: 't5', action: 'นำส่งออกจากคลัง', status: 'shipped', location: 'ท่าจัดส่ง', timestamp: '2026-08-24T15:00:00', operator: 'อรุณ แสงเช้า' }
    ]
  },
  {
    id: 'P025',
    trackingNumber: 'TH-2026-10025',
    senderName: 'สุทัศน์ มองไกล',
    senderAddress: '140 ถ.ราชพฤกษ์ แขวงบางระมาด เขตตลิ่งชัน กรุงเทพฯ 10170',
    recipientName: 'อนงค์ ร่มไทร',
    recipientAddress: '65 ถ.ทุ่งโฮเต็ล ต.วัดเกต อ.เมือง จ.เชียงใหม่ 50000',
    status: 'shipped',
    location: null,
    weight: 1.1,
    dimensions: '20x15x10',
    category: 'เอกสาร',
    priority: 'urgent',
    receivedAt: '2026-08-17T08:00:00',
    timeline: [
      { id: 't1', action: 'รับพัสดุเข้าคลัง', status: 'received', location: 'จุดรับสินค้า', timestamp: '2026-08-17T08:00:00', operator: 'สมชาย ใจดี' },
      { id: 't2', action: 'เริ่มคัดแยกพัสดุ', status: 'sorting', location: 'โซนคัดแยก', timestamp: '2026-08-17T08:30:00', operator: 'อรุณ แสงเช้า' },
      { id: 't3', action: 'จัดเก็บเข้าชั้น', status: 'stored', location: 'โซน A แถว 5 ชั้น 1', timestamp: '2026-08-17T10:00:00', operator: 'สมชาย ใจดี' },
      { id: 't4', action: 'หยิบสินค้าและเตรียมส่ง', status: 'ready_to_ship', location: 'จุดจัดส่ง', timestamp: '2026-08-17T13:00:00', operator: 'อรุณ แสงเช้า' },
      { id: 't5', action: 'นำส่งออกจากคลัง', status: 'shipped', location: 'ท่าจัดส่ง', timestamp: '2026-08-17T16:00:00', operator: 'สมชาย ใจดี' }
    ]
  }
]
