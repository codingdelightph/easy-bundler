package com.mogen.bundle.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import org.springframework.data.elasticsearch.annotations.FieldType;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A ItemPackage.
 */
@Entity
@Table(name = "item_package")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@org.springframework.data.elasticsearch.annotations.Document(indexName = "itempackage")
public class ItemPackage implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "package_id")
    private Integer packageID;

    @Size(max = 20)
    @Column(name = "code", length = 20)
    private String code;

    @Size(max = 140)
    @Column(name = "description", length = 140)
    private String description;

    @OneToMany(mappedBy = "pkg")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<ItemPackageDetails> pkgDets = new HashSet<>();

    @OneToMany(mappedBy = "pkg")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<PkgImages> pkgImgs = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getPackageID() {
        return packageID;
    }

    public ItemPackage packageID(Integer packageID) {
        this.packageID = packageID;
        return this;
    }

    public void setPackageID(Integer packageID) {
        this.packageID = packageID;
    }

    public String getCode() {
        return code;
    }

    public ItemPackage code(String code) {
        this.code = code;
        return this;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getDescription() {
        return description;
    }

    public ItemPackage description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Set<ItemPackageDetails> getPkgDets() {
        return pkgDets;
    }

    public ItemPackage pkgDets(Set<ItemPackageDetails> itemPackageDetails) {
        this.pkgDets = itemPackageDetails;
        return this;
    }

    public ItemPackage addPkgDet(ItemPackageDetails itemPackageDetails) {
        this.pkgDets.add(itemPackageDetails);
        itemPackageDetails.setPkg(this);
        return this;
    }

    public ItemPackage removePkgDet(ItemPackageDetails itemPackageDetails) {
        this.pkgDets.remove(itemPackageDetails);
        itemPackageDetails.setPkg(null);
        return this;
    }

    public void setPkgDets(Set<ItemPackageDetails> itemPackageDetails) {
        this.pkgDets = itemPackageDetails;
    }

    public Set<PkgImages> getPkgImgs() {
        return pkgImgs;
    }

    public ItemPackage pkgImgs(Set<PkgImages> pkgImages) {
        this.pkgImgs = pkgImages;
        return this;
    }

    public ItemPackage addPkgImg(PkgImages pkgImages) {
        this.pkgImgs.add(pkgImages);
        pkgImages.setPkg(this);
        return this;
    }

    public ItemPackage removePkgImg(PkgImages pkgImages) {
        this.pkgImgs.remove(pkgImages);
        pkgImages.setPkg(null);
        return this;
    }

    public void setPkgImgs(Set<PkgImages> pkgImages) {
        this.pkgImgs = pkgImages;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ItemPackage)) {
            return false;
        }
        return id != null && id.equals(((ItemPackage) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "ItemPackage{" +
            "id=" + getId() +
            ", packageID=" + getPackageID() +
            ", code='" + getCode() + "'" +
            ", description='" + getDescription() + "'" +
            "}";
    }
}
