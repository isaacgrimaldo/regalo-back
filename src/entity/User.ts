import { Entity, PrimaryGeneratedColumn, Column,  } from "typeorm"

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    hasGiftGood: boolean

    @Column()
    hasGiftBad: boolean

    @Column()
    personGoodGift: string
    
    @Column()
    personGoodBad: string
}
